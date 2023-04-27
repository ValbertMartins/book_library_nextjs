/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  modularizeImports: {
    "react-icons": {
      transform: "react-icons/md/{{member}}",
    },
  },

  images: {
    domains: ["res.cloudinary.com", "cdn.awsli.com.br"],
  },
}

module.exports = nextConfig
