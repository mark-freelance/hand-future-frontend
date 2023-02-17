const { blackA, green, mauve, slate, violet } = require('@radix-ui/colors');


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
        extend: {
      colors: {
        ...blackA,
        ...green,
        ...mauve,
        ...slate,
        ...violet,
      },
      keyframes: {
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
          to: { transform: 'translateX(0))' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
      },
      animation: {
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
      },
    },
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
