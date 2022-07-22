const {
    PHASE_PRODUCTION_BUILD,
} = require('next/constants');

/**
 * Add environment variables to all app
 *
 * NOTE: Destructure process.env variables won't work due to the nature of webpack DefinePlugin
 *
 * @type {import('./plugins').NextPluginType}
 */
module.exports = (nextConfig, nextComposePlugins = {}) => {
    const { phase = PHASE_PRODUCTION_BUILD } = nextComposePlugins;

    const isBuild = phase === PHASE_PRODUCTION_BUILD;
    const isProd = isBuild && process.env.IS_PRODUCTION === 'true';
    const hasCustomHost = process.env.HOST !== undefined;

    return {
        env: {
            IS_PRODUCTION: isProd,

            HOST: 'localhost',
            DOMAIN: 'http://localhost:3000',
            ...(isProd && {
                HOST: 'localhost', // @TODO change host for prod
                DOMAIN: 'http://localhost:3000', // @TODO change domain for prod
            }),
            ...(hasCustomHost && {
                HOST: process.env.HOST,
                DOMAIN: `https://${process.env.HOST}`,
            }),

            JWT_SECRET: process.env.JWT_SECRET,
            JWT_EXPIRES_IN: 1 * 24 * 60 * 60, // 1 day

            // root admin
            ADMIN_USERNAME: process.env.ADMIN_USERNAME ?? 'admin',
            ADMIN_PASS: process.env.ADMIN_PASS ?? 'admin',
            ADMIN_ROLE: process.env.ADMIN_ROLE ?? 'admin',
        },
    };
};
