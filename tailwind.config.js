/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#05668D",
        secondary: "#36a5dd",
        grey: {
          DEFAULT: "#A9A9A9", // For text, icons, and secondary information
          light: "#E0E0E0", // For borders, dividers, and background elements
          dark: "#4D4D4D", // For secondary text and less prominent elements
        },
        white: "#FFFFFF",
        success: "#66CC66", // Green for success messages, notifications, and confirmations
        error: "#FF6666", // Red for error messages, alerts, and warnings
        warning: "#FFCC66", // Yellow for warnings or important notes
      },
    },
  },
  plugins: [],
};
