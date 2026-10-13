import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { PlayIcon, StopIcon } from '../../components/icons/icons';
import { useI18n } from '../../i18n/i18n-context';
import { cx } from '../../lib/cx';
import { splitIntoChunks } from './split-into-chunks';

import type { JSX } from 'react';

import styles from './tours.module.css';

type VoiceState = 'loading' | 'ready' | 'missing';

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const VOICE_WAIT_MS = 1500;

const isSpeechSupported = (): boolean => typeof window !== 'undefined' && 'speechSynthesis' in window;

const findRussianVoice = (): SpeechSynthesisVoice | null =>
  window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith('ru')) ?? null;

const wordStartBefore = (text: string, position: number): number => {
  const before = text.slice(0, position);
  const lastSpace = before.lastIndexOf(' ');
  return lastSpace < 0 ? 0 : lastSpace + 1;
};

export const ListenDemo = (): JSX.Element => {
  const { t, lang } = useI18n();
  const text = t.listen.excerpt;
  const chunks = useMemo(() => splitIntoChunks(text), [text]);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voiceState, setVoiceState] = useState<VoiceState>(isSpeechSupported() ? 'loading' : 'missing');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rate, setRate] = useState(1);
  const sessionRef = useRef(0);
  const positionRef = useRef(0);

  useEffect(() => {
    if (!isSpeechSupported()) {
      return;
    }
    const synth = window.speechSynthesis;
    const pickVoice = (): void => {
      const russian = findRussianVoice();
      if (russian) {
        setVoice(russian);
        setVoiceState('ready');
      }
    };
    pickVoice();
    synth.addEventListener('voiceschanged', pickVoice);
    const timer = window.setTimeout(() => {
      setVoiceState((current) => (current === 'loading' ? 'missing' : current));
    }, VOICE_WAIT_MS);
    return () => {
      synth.removeEventListener('voiceschanged', pickVoice);
      window.clearTimeout(timer);
      sessionRef.current += 1;
      synth.cancel();
    };
  }, []);

  useEffect(() => {
    sessionRef.current += 1;
    positionRef.current = 0;
    setIsPlaying(false);
    setProgress(0);
    if (isSpeechSupported()) {
      window.speechSynthesis.cancel();
    }
  }, [text]);

  const updatePosition = useCallback(
    (position: number) => {
      positionRef.current = position;
      setProgress(Math.min(1, position / text.length));
    },
    [text],
  );

  const speakFrom = useCallback(
    (start: number, speechRate: number) => {
      const synth = window.speechSynthesis;
      synth.cancel();
      sessionRef.current += 1;
      const session = sessionRef.current;
      const queue = chunks
        .filter((chunk) => chunk.end > start)
        .map((chunk) => ({ start: Math.max(chunk.start, start), end: chunk.end }));

      queue.forEach((part, index) => {
        const utterance = new SpeechSynthesisUtterance(text.slice(part.start, part.end));
        utterance.lang = 'ru-RU';
        utterance.rate = speechRate;
        if (voice) {
          utterance.voice = voice;
        }
        utterance.onstart = () => {
          if (session === sessionRef.current) {
            updatePosition(part.start);
          }
        };
        utterance.onboundary = (event) => {
          if (session === sessionRef.current) {
            updatePosition(part.start + event.charIndex);
          }
        };
        const finish = (): void => {
          if (session !== sessionRef.current) {
            return;
          }
          updatePosition(part.end);
          if (index === queue.length - 1) {
            positionRef.current = 0;
            setIsPlaying(false);
          }
        };
        utterance.onend = finish;
        utterance.onerror = finish;
        synth.speak(utterance);
      });
      setIsPlaying(true);
    },
    [chunks, text, updatePosition, voice],
  );

  const stop = (): void => {
    sessionRef.current += 1;
    window.speechSynthesis.cancel();
    positionRef.current = 0;
    setIsPlaying(false);
    setProgress(0);
  };

  const changeRate = (nextRate: number): void => {
    setRate(nextRate);
    if (isPlaying) {
      speakFrom(wordStartBefore(text, positionRef.current), nextRate);
    }
  };

  const formatSpeed = (speed: number): string =>
    `${new Intl.NumberFormat(lang === 'ru' ? 'ru-RU' : 'en-GB').format(speed)}×`;

  const canPlay = voiceState === 'ready';

  return (
    <figure className={styles['demo']}>
      <figcaption className={styles['demo-head']}>
        <span className={styles['demo-title']}>{t.listen.title}</span>
        <span className={styles['demo-source']}>{t.listen.source}</span>
      </figcaption>
      <blockquote lang="ru" className={cx(styles['excerpt'], isPlaying && styles['excerpt-speaking'])}>
        {text}
      </blockquote>
      {t.listen.translation && (
        <p className={styles['translation']}>
          <span className={styles['translation-label']}>{t.listen.translationLabel}</span> {t.listen.translation}
        </p>
      )}
      <div className={styles['player']}>
        <button
          type="button"
          className={cx(styles['play'], isPlaying && styles['play-stop'])}
          disabled={!canPlay}
          onClick={() => {
            if (isPlaying) {
              stop();
              return;
            }
            speakFrom(0, rate);
          }}
        >
          {isPlaying ? <StopIcon /> : <PlayIcon />}
          <span>{isPlaying ? t.listen.stop : t.listen.play}</span>
        </button>
        <div
          className={styles['track']}
          role="progressbar"
          aria-label={t.listen.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span className={styles['track-fill']} style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
      <div className={styles['speeds']} role="group" aria-label={t.listen.speed}>
        <span className={styles['speeds-label']} aria-hidden="true">
          {t.listen.speed}
        </span>
        {SPEEDS.map((speed) => (
          <button
            key={speed}
            type="button"
            className={cx(styles['speed'], speed === rate && styles['speed-active'])}
            aria-pressed={speed === rate}
            disabled={!canPlay}
            onClick={() => {
              changeRate(speed);
            }}
          >
            {formatSpeed(speed)}
          </button>
        ))}
      </div>
      <p className={styles['demo-note']}>{voiceState === 'missing' ? t.listen.noVoice : t.listen.note}</p>
    </figure>
  );
};
