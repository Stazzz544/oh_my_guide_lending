import { MotionConfig } from 'motion/react';

import { Header } from './components/header/header';
import { I18nProvider } from './i18n/i18n-provider';
import { Faq } from './sections/faq/faq';
import { Footer } from './sections/footer/footer';
import { Hero } from './sections/hero/hero';
import { Install } from './sections/install/install';
import { Library } from './sections/library/library';
import { Nearby } from './sections/nearby/nearby';
import { Privacy } from './sections/privacy/privacy';
import { Themes } from './sections/themes/themes';
import { Tours } from './sections/tours/tours';
import { ThemeProvider } from './theme/theme-provider';

import type { JSX } from 'react';

export const App = (): JSX.Element => (
  <ThemeProvider>
    <I18nProvider>
      <MotionConfig reducedMotion="user">
        <Header />
        <main id="main">
          <Hero />
          <Nearby />
          <Tours />
          <Library />
          <Themes />
          <Privacy />
          <Install />
          <Faq />
        </main>
        <Footer />
      </MotionConfig>
    </I18nProvider>
  </ThemeProvider>
);
