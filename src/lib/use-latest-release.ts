import { useEffect, useState } from 'react';

import { APK_ASSET_NAME, LATEST_RELEASE_API } from './links';

export type ReleaseInfo = {
  version: string;
  megabytes: number;
  publishedAt: string;
};

const CACHE_KEY = 'omg-release';

let request: Promise<ReleaseInfo | null> | null = null;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const parseRelease = (payload: unknown): ReleaseInfo | null => {
  if (!isRecord(payload) || typeof payload['tag_name'] !== 'string' || !Array.isArray(payload['assets'])) {
    return null;
  }
  const asset = payload['assets'].find(
    (item: unknown) => isRecord(item) && item['name'] === APK_ASSET_NAME && typeof item['size'] === 'number',
  );
  if (!isRecord(asset) || typeof asset['size'] !== 'number') {
    return null;
  }
  return {
    version: payload['tag_name'].replace(/^v/, ''),
    megabytes: Math.round(asset['size'] / 1024 / 1024),
    publishedAt: typeof payload['published_at'] === 'string' ? payload['published_at'] : '',
  };
};

const readCache = (): ReleaseInfo | null => {
  try {
    const cached = window.sessionStorage.getItem(CACHE_KEY);
    return cached ? (JSON.parse(cached) as ReleaseInfo) : null;
  } catch {
    return null;
  }
};

const loadRelease = (): Promise<ReleaseInfo | null> => {
  if (request) {
    return request;
  }
  request = fetch(LATEST_RELEASE_API, { headers: { Accept: 'application/vnd.github+json' } })
    .then((response) => (response.ok ? response.json() : null))
    .then((payload: unknown) => {
      const release = parseRelease(payload);
      if (release) {
        try {
          window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(release));
        } catch {
          // storage can be blocked in private mode
        }
      }
      return release;
    })
    .catch(() => null);
  return request;
};

export const useLatestRelease = (): ReleaseInfo | null => {
  const [release, setRelease] = useState<ReleaseInfo | null>(readCache);

  useEffect(() => {
    if (release) {
      return;
    }
    let active = true;
    loadRelease().then((loaded) => {
      if (active) {
        setRelease(loaded);
      }
    });
    return () => {
      active = false;
    };
  }, [release]);

  return release;
};
