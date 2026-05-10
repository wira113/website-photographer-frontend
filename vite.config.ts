import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/website-photographer-frontend/' : '/',
  plugins: [react(), tailwindcss(), tsconfigPaths()],
});