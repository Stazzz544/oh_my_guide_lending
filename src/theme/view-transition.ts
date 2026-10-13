const DECODE_TIMEOUT_MS = 400;

const isInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
};

const waitForVisibleScreens = async (): Promise<void> => {
  const images = Array.from(document.querySelectorAll<HTMLImageElement>('img[data-screen]')).filter(isInViewport);
  const decoding = Promise.allSettled(images.map((image) => image.decode()));
  await Promise.race([decoding, new Promise((resolve) => window.setTimeout(resolve, DECODE_TIMEOUT_MS))]);
};

export const canAnimateTransitions = (): boolean =>
  'startViewTransition' in document && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const runThemeTransition = (origin: HTMLElement | null, update: () => void): void => {
  if (!canAnimateTransitions()) {
    update();
    return;
  }
  const rect = origin?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const y = rect ? rect.top + rect.height / 2 : 0;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const root = document.documentElement;

  root.classList.add('theme-transition');
  const transition = document.startViewTransition(async () => {
    update();
    await waitForVisibleScreens();
  });
  transition.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    })
    .catch(() => undefined);
  transition.finished.finally(() => {
    root.classList.remove('theme-transition');
  });
};
