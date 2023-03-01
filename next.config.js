/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: process.env.APP_ENV === "ANALYZE",
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "avatars.githubusercontent.com",
            "avatars.mds.yandex.net",
            "sun1.userapi.com",
        ],
    },
    async redirects() {
        return [
            {
                source: "/github",
                destination: "https://github.com/diversis",
                permanent: false,
            },
        ];
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
};

module.exports = nextConfig;

const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});
module.exports = withPlugins(
    [
        [withBundleAnalyzer],
        // your other plugins here
    ],
    nextConfig,
);
