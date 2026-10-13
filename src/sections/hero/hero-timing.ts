export const TITLE_START_DELAY = 0.15;
export const TITLE_WORD_STAGGER = 0.07;

export const RING_RADII = [62, 90, 125, 175];

export const titleDuration = (lines: string[]): number =>
  TITLE_START_DELAY + lines.join(' ').split(' ').length * TITLE_WORD_STAGGER;

export const ringDelay = (index: number): number => 0.6 + index * 0.3;
