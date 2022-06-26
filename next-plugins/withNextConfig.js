/**
 * Default next config
 *
 * @type {import('./plugins').NextPluginType}
 */
module.exports = (nextConfig, _nextComposePlugins = {}) => ({
    /**
     * @TODO research
     * @link https://reactjs.org/blog/2022/03/29/react-v18.html#new-strict-mode-behaviors
     */
    reactStrictMode: false,
    poweredByHeader: false,
    eslint: {
        dirs: [
            'src',
        ],
    },
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    /* @TODO remove after enabling as default in next.js */
    swcMinify: true,
});
