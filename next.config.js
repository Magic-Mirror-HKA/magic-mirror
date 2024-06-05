/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
    compiler: {
        styledComponents: true
    },
};

module.exports = nextConfig;
