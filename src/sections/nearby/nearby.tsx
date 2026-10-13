import { useI18n } from '../../i18n/i18n-context';
import { useMediaQuery } from '../../lib/use-media-query';
import { StickyTour } from './sticky-tour';
import { SwipeTour } from './swipe-tour';

import type { ScreenName } from '../../lib/screens';
import type { TourStep } from './tour-step';
import type { JSX } from 'react';

import styles from './nearby.module.css';

const NEARBY_SCREENS: ScreenName[] = [
  'nearby-map',
  'nearby-list',
  'nearby-museums',
  'place-card',
  'route',
  'city',
  'free',
  'favorites',
];

export const Nearby = (): JSX.Element => {
  const { t } = useI18n();
  const isWide = useMediaQuery('(min-width: 768px)');
  const steps: TourStep[] = t.nearby.steps.map((step, index) => ({
    ...step,
    screen: NEARBY_SCREENS[index] ?? 'nearby-map',
  }));

  return (
    <section id="nearby" className={`section ${styles['nearby']}`}>
      <div className="container">
        <div className={styles['intro']}>
          <h2 className="heading-2">{t.nearby.title}</h2>
          <p className="lead">{t.nearby.lead}</p>
        </div>
        {isWide ? <StickyTour steps={steps} /> : <SwipeTour steps={steps} label={t.nearby.carousel} />}
      </div>
    </section>
  );
};
