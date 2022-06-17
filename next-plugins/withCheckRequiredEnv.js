/**
 * @see NodeJS.ProcessEnv}
 */
const REQUIRED_ENV = [];

/**
 * Check required environment variables
 *
 * @type {import('./plugins').NextPluginType}
 */
module.exports = (nextConfig, _nextComposePlugins = {}) => {
    REQUIRED_ENV.forEach((env) => {
        const foundEnv = process.env[env];

        if (!foundEnv) {
            throw new Error(`Couldn't find environment variable: ${env}`);
        }
    });

    return {};
};
