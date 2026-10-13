import { useEffect, useRef, useState } from 'react';

import { Phone } from '../../components/phone/phone';
import { ThemedScreen } from '../../components/phone/themed-screen';
import { cx } from '../../lib/cx';

import type { TourStep } from './tour-step';
import type { JSX } from 'react';

import styles from './nearby.module.css';

type StickyTourProps = {
  steps: TourStep[];
};

const layerClass = (index: number, active: number): string => {
  if (index < active) {
    return styles['layer-before'] ?? '';
  }
  if (index > active) {
    return styles['layer-after'] ?? '';
  }
  return styles['layer-active'] ?? '';
};

export const StickyTour = ({ steps }: StickyTourProps): JSX.Element => {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            setActive(Number(entry.target.dataset['index'] ?? 0));
          }
        });
      },
      { rootMargin: '-48% 0px -48% 0px' },
    );
    stepRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });
    return () => {
      observer.disconnect();
    };
  }, [steps.length]);

  const progress = steps.length > 1 ? active / (steps.length - 1) : 1;

  return (
    <div className={styles['sticky-layout']}>
      <div className={styles['steps-wrap']}>
        <span className={styles['route']} aria-hidden="true">
          <span className={styles['route-fill']} style={{ clipPath: `inset(0 0 ${(1 - progress) * 100}% 0)` }} />
        </span>
        <ol className={styles['steps']}>
          {steps.map((step, index) => (
            <li
              key={step.screen}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              data-index={index}
              className={cx(
                styles['step'],
                index === active && styles['step-active'],
                index < active && styles['step-passed'],
              )}
              aria-current={index === active ? 'step' : undefined}
            >
              <h3 className={styles['step-title']}>{step.title}</h3>
              <p className={styles['step-text']}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles['sticky']}>
        <Phone className={styles['sticky-phone']}>
          {steps.map((step, index) => (
            <div key={step.screen} className={cx(styles['layer'], layerClass(index, active))}>
              <ThemedScreen
                name={step.screen}
                sizes="(max-width: 1023px) 250px, 300px"
                decorative={index !== active}
              />
            </div>
          ))}
        </Phone>
      </div>
    </div>
  );
};
