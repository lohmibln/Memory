import { defineConfig } from 'vite';

export default defineConfig({
  // Relative paths so FileZilla / subdirectory hosting works
  base: './',
  server: {
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
