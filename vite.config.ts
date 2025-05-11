import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/counter/", // 👈 Important!
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["vite.svg"], // Update asset reference here
      manifest: {
        name: "Games Counter",
        short_name: "Counter",
        description: "Games tracking score app",
        theme_color: "#ffffff", // Ensure this matches your design
        background_color: "#ffffff", // Make sure this is also appropriate
        start_url: "/",
        display: "standalone", // This is the key to hide the address bar
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
