const withPWA = require("next-pwa")

module.exports = withPWA({
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ["localhost"],
    },
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
      },
});
