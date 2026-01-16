import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // New sophisticated palette
        forest: {
          50: "#f4f5f4",
          100: "#e8eae8",
          200: "#d1d5d1",
          300: "#b0b8b0",
          400: "#8a958a",
          500: "#CECFE2", // Primary forest green
          600: "#5a6b5a",
          700: "#4a564a",
          800: "#3d463d",
          900: "#343a34",
        },
        sage: {
          50: "#f6f5f4",
          100: "#ede9e7",
          200: "#dbd3cf",
          300: "#c4b6b0",
          400: "#a8958c",
          500: "#5A4A40", // Muted sage
          600: "#7a6b61",
          700: "#655650",
          800: "#544843",
          900: "#473e3a",
        },
        taupe: {
          50: "#faf9f8",
          100: "#f4f2f0",
          200: "#e8e4e1",
          300: "#d7d0cb",
          400: "#c2b7b0",
          500: "#9C928C", // Warm taupe
          600: "#8a7f78",
          700: "#736863",
          800: "#5f5652",
          900: "#4f4743",
        },
        coffee: {
          50: "#faf9f8",
          100: "#f2efed",
          200: "#E3DDDB", // Warm coffee
          300: "#d4ccc8",
          400: "#c0b4af",
          500: "#a69691",
          600: "#8f7d77",
          700: "#766862",
          800: "#625652",
          900: "#524845",
        },
        rose: {
          50: "#faf8f9",
          100: "#f4f0f2",
          200: "#e8dde1",
          300: "#D1A8B3", // Dusty rose accent
          400: "#c299a7",
          500: "#b08a9b",
          600: "#9a7588",
          700: "#806270",
          800: "#6a525c",
          900: "#58454d",
        },
        charcoal: {
          50: "#f6f6f5",
          100: "#e7e7e6",
          200: "#d1d1cf",
          300: "#b0b0ad",
          400: "#888884",
          500: "#6c6c68",
          600: "#5a5a56",
          700: "#4c4c48",
          800: "#41413e",
          900: "#33312E", // Dark charcoal text
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
