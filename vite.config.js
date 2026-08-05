import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  // viteSingleFile inlines all JS/CSS into one index.html at build time.
  // This matters specifically because Chrome blocks <script type="module">
  // from loading over file:// (a CORS restriction on module scripts) —
  // no amount of relative-path fixing gets around that. Inlining
  // everything as a single non-module script sidesteps the problem
  // entirely: double-clicking dist/index.html just works, no server needed.
  plugins: [react(), viteSingleFile()],
  base: './',
})
