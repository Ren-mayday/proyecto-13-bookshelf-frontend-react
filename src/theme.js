import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  globalCss: {
    "html, body": {
      colorPalette: "brand",
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#f9e0de" },
          500: { value: "#ca2d1e" },
          600: { value: "#a12418" },
          700: { value: "#6b1510" },
          900: { value: "#280a08" },
        },
      },
      fonts: {
        heading: { value: "'Syne', sans-serif" },
        body: { value: "'Inter', sans-serif" },
      },
    },
  },
});
