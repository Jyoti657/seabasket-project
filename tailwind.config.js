/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        seabasket_green: "#3D8D7A",
        deep_teal:"#2E6F61",
         charcoal:"#2E2E2E",
         soft_mint:"#E6F4F1"
      },
    },
  },
  plugins: [],
};
