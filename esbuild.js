import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import { builtinModules } from 'module';
import dotenv from 'dotenv';
import { copy } from 'esbuild-plugin-copy';
import fs from 'fs-extra';
import path from 'path';
import { getBuildNumber } from './utils/index.js';

// Load environment variables from .env file
dotenv.config();
const buildNumber = getBuildNumber();

/**
 * Copies assets such as fonts and images from the govuk-frontend package
 * to the 'public/assets' directory for use in the application.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when assets are successfully copied.
 */
const copyAssets = async () => {
  try {
    // Copy fonts and images to 'public/assets'
    await fs.copy(
      path.resolve('./node_modules/govuk-frontend/dist/govuk/assets'),
      path.resolve('./public/assets')
    );
    console.log('Assets copied successfully.');
  } catch (error) {
    console.error('Failed to copy assets:', error);
    process.exit(1);
  }
};

/**
 * Builds the SCSS and JavaScript files for the application using esbuild.
 * The build process includes copying assets, compiling SCSS with transformed paths,
 * and bundling JavaScript files for both server and client use.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the build process completes successfully.
 */
const build = async () => {
  try {
    // List of additional external dependencies
    const additionalExternals = [
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
      'csrf-sync',
    ];

    // Combine core Node.js modules with additional external dependencies
    const externalModules = [...builtinModules, ...additionalExternals, '*.node'];

    // Copy assets before building SCSS
    await copyAssets();

    // Bundle SCSS
    const scssBuildOptions = {
      entryPoints: ['src/scss/main.scss'],
      bundle: true,
      outfile: `public/css/main.${buildNumber}.css`,
      plugins: [
        sassPlugin({
          resolveDir: path.resolve('src/scss'),
          /**
           * Transforms the source SCSS content by replacing asset paths.
           *
           * @param {string} source - The source SCSS content.
           * @returns {string} The transformed SCSS content with updated asset paths.
           */
          transform: (source) => {
            return source
              .replace(/url\(["']?\/assets\/fonts\/([^"')]+)["']?\)/g,
                'url("../../node_modules/govuk-frontend/dist/govuk/assets/fonts/$1")')
              .replace(/url\(["']?\/assets\/images\/([^"')]+)["']?\)/g,
                'url("../../node_modules/govuk-frontend/dist/govuk/assets/images/$1")');
          },
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
      sourcemap: true,
    };

    // Bundle JavaScript
    const jsBuildOptions = {
      entryPoints: ['src/app.js'],
      bundle: true,
      platform: 'node',
      target: 'es2020',
      format: 'esm',
      sourcemap: true,
      minify: true,
      external: externalModules,
      outfile: 'public/app.js',
      plugins: [
        copy({
          assets: [
            {
              from: './node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js',
              to: `./js/govuk-frontend.${buildNumber}.min.js`
            },
            {
              from: './node_modules/govuk-frontend/dist/govuk/assets/',
              to: './assets'
            }
          ]
        })
      ]
    };

    await esbuild.build(scssBuildOptions).catch((error) => {
      console.error('SCSS build failed:', error);
      process.exit(1);
    });

    await esbuild.build(jsBuildOptions).catch((error) => {
      console.error('JS build failed:', error);
      process.exit(1);
    });

    console.log('Build completed successfully.');
  } catch (error) {
    console.error('Build process failed:', error);
    process.exit(1);
  }
};

export { build };

if (import.meta.url === `file://${process.argv[1]}`) {
  build().catch((error) => {
    console.error('Build script failed:', error);
    process.exit(1);
  });
}
