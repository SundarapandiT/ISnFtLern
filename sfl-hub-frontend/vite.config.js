import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import javascriptObfuscator from "vite-plugin-javascript-obfuscator";

export default defineConfig({
  plugins: [
    react(),
    javascriptObfuscator({
      options: {
        compact: true, // Minify and obfuscate
        controlFlowFlattening: true, // Harder to reverse-engineer
        deadCodeInjection: true, // Adds junk code
        debugProtection: true, // Prevents debugging
        // ❌ Remove debugProtectionInterval
        disableConsoleOutput: false, // Keep console logs
        selfDefending: true, // Makes it harder to modify
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 30000,
    sourcemap: false, // Prevent source maps from exposing original code
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
  },
});
