/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  modularizeImports: {
    "react-icons": {
      transform: "react-icons/md/{{member}}",
    },
  },
}

module.exports = nextConfig
