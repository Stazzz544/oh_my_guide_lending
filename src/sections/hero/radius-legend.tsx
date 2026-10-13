import { useEffect, useState } from 'react';

import { cx } from '../../lib/cx';
import { RING_RADII, ringDelay } from './hero-timing';

import type { JSX } from 'react';

import styles from './hero.module.css';

type RadiusLegendProps = {
  labels: string[];
};

export const RadiusLegend = ({ labels }: RadiusLegendProps): JSX.Element => {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(RING_RADII.length - 1);
      return;
    }
    const timers = Array.from({ length: RING_RADII.length }, (_, index) =>
      window.setTimeout(() => {
        setActive(index);
      }, ringDelay(index) * 1000),
    );
    return () => {
      timers.forEach((timer) => {
        window.clearTimeout(timer);
      });
    };
  }, []);

  return (
    <ol className={styles['legend']} aria-hidden="true">
      {labels.map((label, index) => (
        <li
          key={label}
          className={cx(
            styles['legend-item'],
            index <= active && styles['legend-reached'],
            index === active && styles['legend-active'],
          )}
        >
          {label}
        </li>
      ))}
    </ol>
  );
};
