export type Lang = 'ru' | 'en';

export const LANG_STORAGE_KEY = 'omg-lang';

const RUSSIAN_SPEAKING = ['ru', 'uk', 'be', 'kk'];

export const isLang = (value: string | null): value is Lang => value === 'ru' || value === 'en';

export const detectLanguage = (): Lang => {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLang(fromUrl)) {
    return fromUrl;
  }
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (isLang(stored)) {
      return stored;
    }
  } catch {
    // storage can be blocked in private mode
  }
  const browserLanguages = navigator.languages.length > 0 ? navigator.languages : [navigator.language];
  const prefersRussian = browserLanguages.some((language) =>
    RUSSIAN_SPEAKING.includes(language.toLowerCase().split('-')[0] ?? ''),
  );
  if (prefersRussian) {
    return 'ru';
  }
  return 'en';
};
