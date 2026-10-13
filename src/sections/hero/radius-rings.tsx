import { motion, useTransform } from 'motion/react';

import { RING_RADII, ringDelay } from './hero-timing';

import type { MotionValue } from 'motion/react';
import type { JSX } from 'react';

import styles from './hero.module.css';

type RadiusRingsProps = {
  progress: MotionValue<number>;
};

const VIEWBOX = 400;
const CENTER = VIEWBOX / 2;
const RING_OPACITY = [0.95, 0.75, 0.55, 0.4];
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const RadiusRings = ({ progress }: RadiusRingsProps): JSX.Element => {
  const scale = useTransform(progress, [0, 1], [1, 1.3]);
  const opacity = useTransform(progress, [0, 0.75], [1, 0]);

  return (
    <motion.div className={styles['rings']} style={{ scale, opacity }} aria-hidden="true">
      <svg className={styles['rings-svg']} viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}>
        <motion.circle
          className={styles['echo']}
          cx={CENTER}
          cy={CENTER}
          r={CENTER - 4}
          vectorEffect="non-scaling-stroke"
          initial={{ scale: 0.03, opacity: 0 }}
          animate={{ scale: 1, opacity: [0, 0.8, 0] }}
          transition={{ delay: ringDelay(RING_RADII.length), duration: 2.2, ease: 'easeOut' }}
        />
        {RING_RADII.map((radius, index) => (
          <motion.circle
            key={radius}
            className={styles['ring']}
            cx={CENTER}
            cy={CENTER}
            r={radius}
            vectorEffect="non-scaling-stroke"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: RING_OPACITY[index] }}
            transition={{ delay: ringDelay(index), duration: 1, ease: EASE_OUT }}
          />
        ))}
      </svg>
    </motion.div>
  );
};
