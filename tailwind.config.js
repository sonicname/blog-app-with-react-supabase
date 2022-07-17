module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // corePlugins: {
  //   preflight: false,
  // },
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
