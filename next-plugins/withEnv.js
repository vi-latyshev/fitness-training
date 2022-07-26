const {
    PHASE_PRODUCTION_BUILD,
} = require('next/constants');

const getHttpProtocol = (isSecureHost) => `http${isSecureHost ? 's' : ''}://`;

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
    const isSecureHost = process.env.IS_HOST_SECURE === 'true';
    const hasCustomHost = process.env.HOST !== undefined;

    return {
        env: {
            IS_PRODUCTION: isProd,
            IS_HOST_SECURE: isSecureHost,

            HOST: 'localhost',
            DOMAIN: `${getHttpProtocol(isSecureHost)}localhost:3000`,
            ...(hasCustomHost && {
                HOST: process.env.HOST,
                DOMAIN: `${getHttpProtocol(isSecureHost)}${process.env.HOST}`,
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
