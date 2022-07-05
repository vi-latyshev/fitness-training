const waitOn = require('wait-on');
const Log = require('next/dist/build/output/log');
const { default: axios } = require('axios');

const CREATE_USERS_API_URL = (basePath) => `${basePath}/api/users`;

const addUsers = async (basePath, username, password) => {
    try {
        await axios.post(CREATE_USERS_API_URL(basePath), {
            auth: {
                username,
                password,
            },
            meta: {
                firstName: username,
                lastName: username,
            },
        });
    } catch (e) {
        // skip
    }
};

const waitOnInitialData = async (basePath) => {
    const resources = [
        CREATE_USERS_API_URL(basePath),
    ].map((url) => url.replace(/(:\/\/)/, '-get://'));

    const waitOnOptions = {
        resources,
        interval: 5000,
        validateStatus: () => true,
    };
    await waitOn(waitOnOptions);
};

/**
 * Precompile index page and /api routes
 *
 * @type {import('./plugins').NextPluginType}
 */
module.exports = (nextConfig, _nextComposePlugins = {}) => {
    const { env: { DOMAIN, ADMIN_USERNAME, ADMIN_PASS } } = nextConfig;

    (async () => {
        Log.wait('initial DB data...');
        await waitOnInitialData(DOMAIN);
        await addUsers(DOMAIN, ADMIN_USERNAME, ADMIN_PASS);
        Log.event('DB data loaded');
    })();

    return {};
};
