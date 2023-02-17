const { violet, blackA, mauve, green } = require('@radix-ui/colors');


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...violet,
        ...green,
        ...blackA,
      },
      keyframes: {
        overlayShow: {
          from: {opacity: 0},
          to: {opacity: 1},
        },
        contentShow: {
          from: {opacity: 0, transform: 'translate(-50%, 0%) scale(0)'},
          to: {opacity: 1, transform: 'translate(-50%, 0%) scale(1)'},
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    }
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
