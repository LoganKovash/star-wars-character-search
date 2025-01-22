/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-primary": "#3EC2FC",
        "app-secondary": "#F8F5E1",
        "app-background": "#0a2633"
      }
    },
    fontFamily: {
      Orbitron: ["Orbitron, serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    }
  },
  plugins: [],
}

