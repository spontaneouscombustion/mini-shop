/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    import('@tailwindcss/forms'),
    import('@tailwindcss/typography')
  ],
}
