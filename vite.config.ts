/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // won't need to import test function definitions
    environment: 'jsdom',
    css: true,
    setupFiles: 'src/test/setup.ts'
  }
});
