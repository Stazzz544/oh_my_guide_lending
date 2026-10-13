import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const RAW_DIR = 'screens-raw';
const OUT_DIR = 'src/assets/screens';
const PUBLIC_DIR = 'public';
const APP_ICON = '../OhMyGuide/assets/icon.png';
const WIDTHS = [480, 960];

const roundedScreen = async (file, height, radius) => {
  const resized = await sharp(file).resize({ height }).png().toBuffer();
  const { width } = await sharp(resized).metadata();
  const mask = Buffer.from(
    `<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}" ry="${radius}"/></svg>`,
  );
  return {
    width,
    buffer: await sharp(resized)
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer(),
  };
};

const buildScreens = async () => {
  await mkdir(OUT_DIR, { recursive: true });
  const files = (await readdir(RAW_DIR)).filter((file) => file.endsWith('.png'));
  for (const file of files) {
    const name = file.replace(/\.png$/, '');
    for (const width of WIDTHS) {
      await sharp(path.join(RAW_DIR, file))
        .resize({ width })
        .webp({ quality: 82, effort: 6 })
        .toFile(path.join(OUT_DIR, `${name}-${width}.webp`));
    }
  }
  console.log(`screens: ${files.length} × ${WIDTHS.length}`);
};

const buildIcons = async () => {
  await sharp(APP_ICON).resize(64).png().toFile(path.join(PUBLIC_DIR, 'favicon.png'));
  await sharp(APP_ICON).resize(180).png().toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  await sharp(APP_ICON).resize(192).png().toFile(path.join(PUBLIC_DIR, 'icon-192.png'));
  console.log('icons: done');
};

const buildOgImage = async () => {
  const dark = await roundedScreen(path.join(RAW_DIR, 'nearby-map-dark.png'), 540, 34);
  const light = await roundedScreen(path.join(RAW_DIR, 'nearby-map-light.png'), 540, 34);
  const icon = await sharp(APP_ICON).resize(112).png().toBuffer();
  const text = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <circle cx="905" cy="315" r="300" fill="none" stroke="#5b6bd6" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="10 12"/>
    <circle cx="905" cy="315" r="420" fill="none" stroke="#5b6bd6" stroke-opacity="0.2" stroke-width="2" stroke-dasharray="10 12"/>
    <text x="80" y="300" font-family="Georgia, serif" font-size="74" font-weight="700" fill="#f0f0f7">OhMyGuide</text>
    <text x="80" y="370" font-family="Segoe UI, Arial, sans-serif" font-size="32" fill="#a0a0b0">Что рядом — покажет карта.</text>
    <text x="80" y="414" font-family="Segoe UI, Arial, sans-serif" font-size="32" fill="#a0a0b0">Остальное расскажет гид.</text>
  </svg>`);
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#0d0d1a' } })
    .composite([
      { input: text, left: 0, top: 0 },
      { input: icon, left: 80, top: 110 },
      { input: light.buffer, left: 940, top: 70 },
      { input: dark.buffer, left: 720, top: 30 },
    ])
    .png()
    .toFile(path.join(PUBLIC_DIR, 'og.png'));
  console.log('og: done');
};

await buildScreens();
await buildIcons();
await buildOgImage();
