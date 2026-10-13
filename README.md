# OhMyGuide — лендинг

Сайт Android-приложения [OhMyGuide](https://github.com/Stazzz544/ohMyGuide). Русский и английский, светлая и тёмная тема, хостинг на GitHub Pages: https://stazzz544.github.io/oh_my_guide_lending/

Стек: Vite, React 19, TypeScript, CSS Modules, [motion](https://motion.dev), шрифты Literata и Onest через Fontsource.

## Команды

```bash
npm install
npm run dev        # локальный сервер
npm run build      # проверка типов и сборка в dist/
npm run preview    # просмотр сборки
npm run screens    # пересобрать WebP-скриншоты, иконки и og.png из screens-raw/
```

## Скриншоты

Только настоящие кадры приложения. Как они сняты, описано в [docs/screens.md](docs/screens.md).
Сырые PNG лежат в `screens-raw/` и в git не попадают. Готовые WebP — в `src/assets/screens/` (`<экран>-<тема>-<ширина>.webp`).
Чтобы заменить кадр: положите новый PNG в `screens-raw/` под тем же именем и запустите `npm run screens`.

## Кнопка «Скачать APK»

Кнопка ведёт на `https://github.com/Stazzz544/ohMyGuide/releases/latest/download/oh-my-guide.apk`.
Ссылка работает, пока в последнем релизе приложения есть файл с именем ровно `oh-my-guide.apk`.
Версию, размер и дату страница берёт из GitHub API. Если API недоступен, показывает «≈ 118 МБ».

## Тексты

Все тексты лежат в `src/i18n/ru.ts` (источник) и `src/i18n/en.ts`. Если в одном файле нет ключа из другого, TypeScript выдаст ошибку.

## Деплой

1. Создайте репозиторий на GitHub и запушьте ветку `main`.
2. В Settings → Pages выберите Source: **GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` соберёт и опубликует сайт при каждом пуше в `main`.

Пути в сборке относительные (`base: './'`), поэтому сайт работает под любым именем репозитория.
