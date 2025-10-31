import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// If you host under a subpath (e.g., GitHub Pages repo `Goglobal`),
// set base to '/Goglobal/'. For local dev or root hosting, use '/'.
const isProd = process.env.NODE_ENV === 'production';
const base = process.env.VITE_BASE || (isProd ? '/Goglobal/' : '/');

export default defineConfig({
  base,
  plugins: [react()],
})
