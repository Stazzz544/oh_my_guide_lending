import { cx } from '../../lib/cx';

import type { JSX, ReactNode } from 'react';

import styles from './phone.module.css';

type PhoneProps = {
  children: ReactNode;
  className?: string;
};

export const Phone = ({ children, className }: PhoneProps): JSX.Element => (
  <div className={cx(styles['phone'], className)}>
    <div className={styles['screen']}>{children}</div>
    <span className={styles['camera']} aria-hidden="true" />
  </div>
);
