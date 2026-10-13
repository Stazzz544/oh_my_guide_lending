import { Fragment } from 'react';

import { TITLE_START_DELAY, TITLE_WORD_STAGGER } from './hero-timing';

import type { JSX } from 'react';

import styles from './animated-title.module.css';

type AnimatedTitleProps = {
  lines: string[];
};

export const AnimatedTitle = ({ lines }: AnimatedTitleProps): JSX.Element => {
  let wordIndexTotal = 0;

  return (
    <h1 className={styles['title']}>
      <span className="visually-hidden">{lines.join(' ')}</span>
      {lines.map((line) => (
        <span key={line} className={styles['line']} aria-hidden="true">
          {line.split(' ').map((word, wordIndex) => {
            const delay = TITLE_START_DELAY + wordIndexTotal * TITLE_WORD_STAGGER;
            wordIndexTotal += 1;
            return (
              <Fragment key={`${word}-${wordIndex}`}>
                {wordIndex > 0 && ' '}
                <span className={styles['word']} style={{ animationDelay: `${delay}s` }}>
                  {word}
                </span>
              </Fragment>
            );
          })}
        </span>
      ))}
    </h1>
  );
};
