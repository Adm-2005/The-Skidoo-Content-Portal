/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/**/*.html,.css", 
  ],
  safelist: [
    "bg-red-500", 
    "bg-blue-500", 
    "bg-gray-50", 
    "p-2",
    "p-4", 
    "space-y-2",
    "space-y-4",
    "border",
    "rounded", 
    "rounded-lg",
    "text-white", 
    "w-full"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

