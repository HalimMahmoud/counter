import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath } from "url";
import fs from "fs";

const pkg = JSON.parse(
  fs.readFileSync(new URL("./package.json", import.meta.url), "utf-8")
);

export default defineConfig({
  define: {
    "import.meta.env.APP_VERSION": JSON.stringify(pkg.version),
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  base: "/counter/",
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // Include all PWA assets so the service worker precaches them
      includeAssets: ["icon-192x192.png", "icon-512x512.png", "counter.png", "vite.svg"],
      workbox: {
        // Ensure the SW controls all pages under /counter/
        navigateFallback: "/counter/index.html",
        navigateFallbackDenylist: [/^\/counter\/assets\//],
      },
      manifest: {
        name: "Game Counter",
        short_name: "Game Counter",
        version: pkg.version,
        description: "Gaming scoreboards tracker with interactive profile pictures, game logs, and persistence toggle.",
        theme_color: "#0F172A",
        background_color: "#0F172A",
        // scope and start_url must both be under the base path
        scope: "/counter/",
        start_url: "/counter/",
        display: "standalone",
        orientation: "portrait-primary",
        categories: ["games", "utilities"],
        shortcuts: [
          {
            name: "Players Setup",
            short_name: "Players",
            description: "Configure competitor setup",
            url: "/counter/#/Players",
            icons: [{ src: "icon-192x192.png", sizes: "192x192" }]
          },
          {
            name: "Teams Setup",
            short_name: "Teams",
            description: "Configure team setup",
            url: "/counter/#/Teams",
            icons: [{ src: "icon-192x192.png", sizes: "192x192" }]
          }
        ],
        screenshots: [
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            form_factor: "narrow",
            label: "Game Scoreboard Screen"
          }
        ],
        icons: [
          {
            // Relative paths — the manifest itself lives at /counter/manifest.webmanifest
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            // maskable icon for Android adaptive icons
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      } as any,
    }),
  ],
});
