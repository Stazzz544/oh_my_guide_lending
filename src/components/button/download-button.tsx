import { useI18n } from '../../i18n/i18n-context';
import { APK_URL } from '../../lib/links';
import { useLatestRelease } from '../../lib/use-latest-release';
import { DownloadIcon } from '../icons/icons';
import { ButtonLink } from './button-link';

import type { JSX } from 'react';

import styles from './button.module.css';

type DownloadButtonProps = {
  size?: 'regular' | 'large';
  className?: string;
};

export const DownloadButton = ({ size = 'large', className }: DownloadButtonProps): JSX.Element => {
  const { t } = useI18n();
  const release = useLatestRelease();
  const sizeLabel = release ? t.download.size(release.megabytes) : t.download.sizeFallback;

  return (
    <ButtonLink href={APK_URL} size={size} className={className}>
      <DownloadIcon />
      <span>{t.download.full}</span>
      <span className={styles['meta']}>{sizeLabel}</span>
    </ButtonLink>
  );
};
