import { cx } from '../../lib/cx';

import type { JSX, ReactNode } from 'react';

import styles from './button.module.css';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'regular' | 'large' | 'compact';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
};

export const ButtonLink = ({
  href,
  children,
  variant = 'primary',
  size = 'regular',
  external = false,
  className,
}: ButtonLinkProps): JSX.Element => (
  <a
    className={cx(styles['button'], styles[variant], styles[size], className)}
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener' : undefined}
  >
    {children}
  </a>
);
