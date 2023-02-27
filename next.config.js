/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["lh3.googleusercontent.com"],
        domains: ["avatars.githubusercontent.com"],
        domains: ["avatars.mds.yandex.net"],
        domains: ["sun1.userapi.com"],
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
