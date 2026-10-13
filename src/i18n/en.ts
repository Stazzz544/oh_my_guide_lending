import type { Dictionary } from './ru';

export const en: Dictionary = {
  meta: {
    title: 'OhMyGuide — a guide to the places around you',
    description:
      'An Android app that maps notable places around you, builds walking routes and writes tours your phone reads aloud. Free, no sign-up. The app is in Russian.',
  },
  a11y: {
    skip: 'Skip to content',
    navigation: 'Page sections',
    language: 'Site language',
    toDark: 'Switch to dark theme',
    toLight: 'Switch to light theme',
    home: 'OhMyGuide, back to top',
  },
  nav: [
    { href: '#nearby', label: 'Nearby' },
    { href: '#tours', label: 'Tours' },
    { href: '#install', label: 'Install' },
    { href: '#faq', label: 'FAQ' },
  ],
  download: {
    full: 'Download APK',
    short: 'Download',
    sizeFallback: '≈ 118 MB',
    size: (megabytes: number): string => `${megabytes} MB`,
    version: (version: string): string => `Version ${version}`,
  },
  hero: {
    titleLines: ['The map shows what’s nearby.', 'The guide tells the rest.'],
    lead: 'OhMyGuide finds notable places around you, maps them with walking times and writes a tour about any of them. Your phone reads it aloud, so you can just walk and listen.',
    github: 'Source on GitHub',
    facts: ['Android 7.0 or newer', 'Free', 'No sign-up, no ads', 'The app is in Russian'],
    rings: ['500 m', '1 km', '2 km', '5 km'],
  },
  nearby: {
    title: 'Everything worth seeing, within walking distance',
    lead: 'Open the Nearby tab and OhMyGuide shows the notable places around you.',
    carousel: 'What the Nearby tab does. Swipe sideways.',
    steps: [
      {
        title: 'Pick a radius',
        text: '500 m, 1, 2 or 5 km around you. The map keeps only the places you can reach on foot.',
      },
      {
        title: 'A list with photos and walking times',
        text: 'Every place shows its distance and how long the walk takes. Sort by distance or by fame, measured by how many languages the place has a Wikipedia article in.',
      },
      {
        title: 'Only places worth a detour',
        text: 'Places come from Wikipedia and Wikidata. Metro stations, factories, streets and demolished buildings are filtered out; the rest is grouped into churches, museums, parks and monuments.',
      },
      {
        title: 'Place card',
        text: 'A link to the Wikipedia article, the straight-line distance and three actions: a walking route, a tour about the place, or a hand-off to your navigation app.',
      },
      {
        title: 'Walking route',
        text: 'A line from you to the place, with the walking time. When you arrive, the app tells you you’re there.',
      },
      {
        title: 'The whole city',
        text: '“City” mode gathers notable places across the whole city you’re in.',
      },
      {
        title: 'Anywhere on the map',
        text: 'In “Free” mode, pan the map and places load for the area in view — even many kilometres away from you.',
      },
      {
        title: 'Favourites in groups',
        text: 'Star a place and it stays on the map. Make groups like “Day 1” and pick a marker colour.',
      },
    ],
  },
  tours: {
    title: 'A tour of any place, from a single line',
    lead: 'Type where you’re going, or tap “Tour” on a place card. A Groq model writes an 800–1,000-word story: history, key events, facts and legends, architecture, the place today. Tours are in Russian.',
    listenTitle: 'Listen as you walk',
    features: [
      'Your phone reads the tour aloud. Pick a Russian voice in Settings.',
      'The current sentence is highlighted. Tap any sentence to continue from there.',
      'Speed from 0.5× to 2×.',
      'Minimise the app and the tour keeps playing.',
    ],
    keyNote: 'Tours need a free Groq key.',
    keyLink: 'How to get one',
  },
  listen: {
    title: 'Hear how a tour starts',
    source: 'From the “St. Basil’s Cathedral” tour generated in the app',
    play: 'Listen',
    stop: 'Stop',
    speed: 'Speed',
    progress: 'Reading progress',
    note: 'Here it’s your browser’s voice; in the app it’s your phone’s.',
    noVoice: 'Your browser has no Russian voice, so the excerpt can only be read.',
    excerpt:
      'Храм Покрова Пресвятой Богородицы на Рву, более известный как Храм Василия Блаженного, построен в 1555—1561 годах по указу Ивана Грозного в знак благодарности за победу в Казанской войне; комплекс состоит из одиннадцати отдельных храмов, соединённых единой основанием‑подклётом.',
    translationLabel: 'Translation',
    translation:
      'The Cathedral of the Intercession of the Most Holy Theotokos on the Moat, better known as St. Basil’s Cathedral, was built in 1555–1561 by order of Ivan the Terrible in gratitude for the victory in the Kazan War; the complex consists of eleven separate churches joined by a single base, the podklet.',
  },
  library: {
    title: 'Your tours stay with you',
    text: 'Save tours into folders and subfolders. Everything stays on your phone, so a saved tour plays even without internet.',
  },
  themes: {
    title: 'Day and night',
    text: 'The app follows your phone’s theme, with a switch always at hand in the header. Dark mode comes with a dark map.',
    button: 'Switch this page’s theme',
    caption: 'The screenshots on this page switch with it.',
  },
  privacy: {
    title: 'No account, no ads, no tracking',
    items: [
      {
        title: 'No sign-up',
        text: 'Open it and go: the app has no accounts.',
      },
      {
        title: 'No ads, no analytics',
        text: 'No banners, no trackers.',
      },
      {
        title: 'No server of its own',
        text: 'Your phone talks directly to Wikipedia, OpenStreetMap and Groq. Favourites, tours and your key stay on the phone.',
      },
    ],
  },
  install: {
    title: 'Install in a minute',
    lead: 'OhMyGuide ships as an APK file on GitHub, not through Google Play.',
    requirements: 'Android 7.0 or newer',
    qr: 'Point your phone’s camera here to download the APK',
    releases: 'All versions on GitHub',
    steps: [
      {
        title: 'Download the APK',
        text: 'Use the button above or the QR code. The file is about 118 MB.',
      },
      {
        title: 'Allow the install',
        text: 'Android asks whether your browser may install apps. Allow it and open the downloaded file.',
      },
      {
        title: 'Open OhMyGuide',
        text: 'Grant location access — it’s only used while the app is open.',
      },
      {
        title: 'Add a Groq key for tours',
        text: '“Настройки” (Settings) → “Получить бесплатный ключ” (Get a free key). Copy the key from the Groq site and paste it into the field. The map and places work without a key.',
      },
    ],
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        question: 'How much does it cost?',
        answer:
          'The app is free, with no ads or subscriptions. Tours are written by a Groq model using your own key, and Groq’s free tier costs nothing as long as you stay within its limits.',
      },
      {
        question: 'Do I need an account?',
        answer: 'No. OhMyGuide has no accounts.',
      },
      {
        question: 'Can I trust the facts in a tour?',
        answer:
          'Tours are written by an AI model, and it can get things wrong — dates, names and events. Check anything important in the Wikipedia article: the place card links to it.',
      },
      {
        question: 'Does it work offline?',
        answer:
          'The map, place search and tour writing need an internet connection. Saved tours play offline if your phone has an offline Russian voice.',
      },
      {
        question: 'Is there an iPhone version?',
        answer: 'No, Android 7.0 or newer only.',
      },
      {
        question: 'What language is the app in?',
        answer: 'Russian: the interface, the tours and the voice. Places come from the Russian-language Wikipedia.',
      },
      {
        question: 'Where do the places and the map come from?',
        answer:
          'Places come from Wikidata and Wikipedia, photos from Wikimedia Commons. The map is OpenFreeMap built on OpenStreetMap data; walking routes come from OSRM.',
      },
      {
        question: 'Why might I need a VPN?',
        answer:
          'Groq isn’t available everywhere. If it’s blocked, the app suggests turning on a VPN. The map, places and routes work without one.',
      },
      {
        question: 'Where does my data go?',
        answer:
          'The app has no server of its own. To find places, your coordinates go to Wikidata (rounded to about 2 km) and Wikipedia; for a route, to OSRM. Groq gets the place name without coordinates — and, for a tour started from a place card, its address and the opening of its Wikipedia article.',
      },
      {
        question: 'Android warns me about an unknown app. What should I do?',
        answer:
          'Android shows this for any app that isn’t from Google Play. Allow installs for the browser you downloaded the file with. The app’s source code is on GitHub.',
      },
    ],
  },
  footer: {
    tagline: 'A pocket guide for self-guided walks.',
    screenshots: 'Every screenshot was taken from the real app on an Android emulator.',
    credits:
      'Data: Wikidata, Wikipedia, Wikimedia Commons. Map: OpenFreeMap, © OpenStreetMap contributors. Routes: OSRM. Tours: Groq.',
    github: 'Source on GitHub',
    releases: 'Releases',
  },
  screens: {
    'nearby-map':
      'The Nearby tab: a map of central Moscow with sight markers within 5 km of the “you are here” dot, and a list of places with photos below',
    'nearby-list':
      'Places sorted by fame: Red Square, the Moscow Kremlin, St. Basil’s Cathedral, the Bolshoi Theatre — with photos, distances and walking times',
    'nearby-museums':
      'The list filtered to museums: the Tretyakov Gallery, the Pushkin Museum, the State Historical Museum, the Armoury',
    'place-card':
      'The place card for St. Basil’s Cathedral: a Wikipedia link, 210 m in a straight line, and Route and Tour buttons',
    route:
      'A walking route from Red Square across the Moskva River to the Tretyakov Gallery: 23 minutes, 1.8 km',
    city: '“City” mode: notable places across Moscow within the city limits',
    free: '“Free” mode: places around VDNKh — the Ostankino Tower, the Worker and Kolkhoz Woman statue, VDNKh itself',
    favorites:
      'Favourites: coloured markers on the map and a “Day 1” group with GUM, St. Basil’s Cathedral and the Bolshoi Theatre',
    generate:
      'The tour screen with “Red Square, Moscow” typed into the “Where are we going?” field and the Generate button',
    tour: 'The St. Basil’s Cathedral tour being read aloud: the current sentence is highlighted, with progress and speed controls',
    saved:
      'Saved tours: GUM, a “Moscow” folder with the Bolshoi Theatre and a nested “Red Square” folder',
    settings:
      'Settings: the Groq API key field, the “Get a free key” button, voice and theme options',
  },
};
