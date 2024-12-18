import { PurgeCSS } from "purgecss";
import autoprefixer from "autoprefixer";

const purgeCSSPlugin = await new PurgeCSS().purge({
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./src/components/**/*.jsx",
    "./src/pages/**/*.jsx",
  ],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

export const config = {
  plugins: [autoprefixer, purgeCSSPlugin],
};
