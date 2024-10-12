/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    swcMinify: true,
    basePath:
        process.env.NEXT_BASE_PATH === '/'
            ? ''
            : process.env.NEXT_BASE_PATH ?? '',
};

module.exports = nextConfig;
