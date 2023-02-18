const {violet, blackA, mauve, green} = require('@radix-ui/colors');

const primary = '#109B7B'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {


    extend: {
      // radix
      colors: {

        // 千万不能卸载theme里，不然就等于限制只能用这一种颜色了
        // primary, ref:https://tailwindcss.com/docs/customizing-colors#naming-your-colors
        primary,
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
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],

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
    // themes: true,
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary,
          "primary-focus": "mediumblue",
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary,
          "primary-focus": "mediumblue",
        },
      },
    ],
  },
}
