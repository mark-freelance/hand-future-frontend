/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  // daisyUI config (optional), ref: https://daisyui.com/docs/config/
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",

    // ref: https://daisyui.com/docs/themes/
    themes: true,
    // themes: [
    //   {
    //     light: {
    //       ...require("daisyui/src/colors/themes")["[data-theme=light]"],
    //       primary: "blue",
    //       "primary-focus": "mediumblue",
    //     },
    //   }
    // ],
  },
}
