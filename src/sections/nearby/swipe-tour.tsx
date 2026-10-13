import { useRef, useState } from 'react';

import { Phone } from '../../components/phone/phone';
import { ThemedScreen } from '../../components/phone/themed-screen';
import { cx } from '../../lib/cx';

import type { TourStep } from './tour-step';
import type { JSX } from 'react';

import styles from './nearby.module.css';

type SwipeTourProps = {
  steps: TourStep[];
  label: string;
};

export const SwipeTour = ({ steps, label }: SwipeTourProps): JSX.Element => {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  const onScroll = (): void => {
    const list = listRef.current;
    const firstCard = list?.firstElementChild;
    if (!list || !(firstCard instanceof HTMLElement)) {
      return;
    }
    const step = firstCard.offsetWidth + parseFloat(getComputedStyle(list).columnGap || '0');
    setActive(Math.min(steps.length - 1, Math.max(0, Math.round(list.scrollLeft / step))));
  };

  return (
    <div className={styles['swipe-wrap']}>
      <ol ref={listRef} className={styles['swipe']} tabIndex={0} aria-label={label} onScroll={onScroll}>
        {steps.map((step) => (
          <li key={step.screen} className={styles['card']}>
            <Phone className={styles['card-phone']}>
              <ThemedScreen name={step.screen} sizes="62vw" />
            </Phone>
            <h3 className={styles['step-title']}>{step.title}</h3>
            <p className={styles['step-text']}>{step.text}</p>
          </li>
        ))}
      </ol>
      <div className={styles['dots']} aria-hidden="true">
        {steps.map((step, index) => (
          <span key={step.screen} className={cx(styles['dot'], index === active && styles['dot-active'])} />
        ))}
      </div>
    </div>
  );
};
