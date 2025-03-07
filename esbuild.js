import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import { builtinModules } from 'module';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';
import { getBuildNumber } from './utils/index.js';

// Load environment variables
dotenv.config();
const buildNumber = getBuildNumber();

/**
 * Copies GOV.UK assets such as fonts and images from `govuk-frontend`
 * to the `public/assets` directory.
 */
const copyGovukAssets = async () => {
  try {
    await fs.copy(
        path.resolve('./node_modules/govuk-frontend/dist/govuk/assets'),
        path.resolve('./public/assets')
    );
    console.log('✅ GOV.UK assets copied successfully.');
  } catch (error) {
    console.error('❌ Failed to copy assets:', error);
    process.exit(1);
  }
};

/**
 * List of external dependencies that should not be bundled.
 */
const externalModules = [
  ...builtinModules,
  'express',
  'nunjucks',
  'dotenv',
  'crypto',
  'cookie-signature',
  'cookie-parser',
  'body-parser',
  'express-session',
  'morgan',
  'compression',
  'sqlite3',
  'sqlite',
  'axios',
  'middleware-axios',
  'util',
  'path',
  'fs',
  'figlet',
  'csrf-sync',
  '*.node'
];

/**
 * Builds SCSS files.
 */
const buildScss = async () => {
  await esbuild.build({
    entryPoints: ['src/scss/main.scss'],
    bundle: true,
    outfile: `public/css/main.${buildNumber}.css`,
    plugins: [
      sassPlugin({
        resolveDir: path.resolve('src/scss'),
        transform: (source) =>
            source
                .replace(/url\(["']?\/assets\/fonts\/([^"')]+)["']?\)/g, 'url("../../node_modules/govuk-frontend/dist/govuk/assets/fonts/$1")')
                .replace(/url\(["']?\/assets\/images\/([^"')]+)["']?\)/g, 'url("../../node_modules/govuk-frontend/dist/govuk/assets/images/$1")')
      })
    ],
    loader: {
      '.scss': 'css',
      '.woff': 'file',
      '.woff2': 'file',
      '.png': 'file',
      '.jpg': 'file',
      '.svg': 'file'
    },
    minify: true,
    sourcemap: true
  }).catch((error) => {
    console.error('❌ SCSS build failed:', error);
    process.exit(1);
  });
};

/**
 * Builds `app.js`.
 */
const buildAppJs = async () => {
  await esbuild.build({
    entryPoints: ['src/app.js'],
    bundle: true,
    platform: 'node',
    target: 'es2020',
    format: 'esm',
    sourcemap: true,
    minify: true,
    external: externalModules,
    outfile: 'public/app.js'
  }).catch((error) => {
    console.error('❌ app.js build failed:', error);
    process.exit(1);
  });
};

/**
 * Builds `custom.js` with a build number.
 */
const buildCustomJs = async () => {
  await esbuild.build({
    // Add other custom js files to concat into one here.
    entryPoints: ['src/js/custom.js'],
    bundle: true,
    platform: 'browser',
    target: 'es2020',
    format: 'esm',
    sourcemap: true,
    minify: true,
    outfile: `public/js/custom.${buildNumber}.min.js`
  }).catch((error) => {
    console.error('❌ custom.js build failed:', error);
    process.exit(1);
  });
};

/**
 * Builds GOV.UK frontend files separately.
 */
const buildGovukFrontend = async () => {
  await esbuild.build({
    entryPoints: ['./node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js'],
    bundle: false, // No need to bundle, just copy
    outfile: `public/js/govuk-frontend.${buildNumber}.min.js`
  }).catch((error) => {
    console.error('❌ GOV.UK frontend JS copy failed:', error);
    process.exit(1);
  });
};

/**
 * Main build process
 */
const build = async () => {
  try {
    console.log('🚀 Starting build process...');

    // Copy assets
    await copyGovukAssets();

    // Build SCSS
    await buildScss();

    // Build JavaScript files
    await Promise.all([
      buildAppJs(),
      buildCustomJs(),
      buildGovukFrontend()
    ]);

    console.log('✅ Build completed successfully.');
  } catch (error) {
    console.error('❌ Build process failed:', error);
    process.exit(1);
  }
};

export { build };

if (import.meta.url === `file://${process.argv[1]}`) {
  build().catch((error) => {
    console.error('❌ Build script failed:', error);
    process.exit(1);
  });
}
