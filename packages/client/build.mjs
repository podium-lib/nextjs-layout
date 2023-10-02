import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: [
    'src/podlet.jsx',
  ],
  target: 'esnext',
  format: 'esm',
  jsx: 'automatic',
  /*
  external: [
    'next', 
    'react', 
    'react-dom',
    '@podium/layout',
    '@podium/utils',
  ],
  */
  minify: false,
  bundle: false,
  outdir: 'build/',
})