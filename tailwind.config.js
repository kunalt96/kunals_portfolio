/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        abyss: token("abyss"),
        deep: token("deep"),
        raise: token("raise"),
        foam: token("foam"),
        mist: token("mist"),
        gold: token("gold"),
        cobalt: token("cobalt"),
        sea: token("sea"),
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque Variable"', "system-ui", "sans-serif"],
        display: ['"Bricolage Grotesque Variable"', "system-ui", "sans-serif"],
        serif: ['"Newsreader Variable"', "Georgia", "serif"],
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
}
