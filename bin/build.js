/* eslint-disable no-console */
import { exec } from 'child_process';
import esbuild from 'esbuild';

const buildDirectory = 'dist';
const production = process.env.NODE_ENV === 'production';

// Config entrypoint files
const entryPoints = ['src/index.ts'];

/**
 * Default Settings
 * @type {esbuild.BuildOptions}
 */
const defaultSettings = {
  bundle: true,
  outdir: buildDirectory,
  minify: production,
  sourcemap: !production,
  target: production ? 'es2017' : 'esnext',
  entryPoints,
};

// Files building
if (production) {
  esbuild.build(defaultSettings);

  // Transpile and format webflow-hacks
  exec('tsc --project tsconfig.hacks.json', () => {
    exec('eslint --ignore-path .gitignore ./src/webflow-hacks --fix', () => {
      exec('prettier --write ./src/webflow-hacks');
    });
  });
}

// Files serving
else {
  esbuild
    .serve(
      {
        servedir: buildDirectory,
        port: 3000,
      },
      defaultSettings
    )
    .then((server) => {
      console.log(`Serving at http://localhost:${server.port}`);
    });
}
