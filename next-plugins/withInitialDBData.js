const waitOn = require('wait-on');
const Log = require('next/dist/build/output/log');
const { default: axios } = require('axios');
const jwt = require('jsonwebtoken');

const LOCAL_DOMAIN = 'http://localhost:3001';

const CREATE_USERS_API_URL = `${LOCAL_DOMAIN}/api/users`;

const addUsers = async (username, password, role, authorization) => {
    try {
        await axios.post(CREATE_USERS_API_URL, {
            auth: {
                username,
                password,
            },
            meta: {
                firstName: username,
                lastName: username,
                role,
            },
        }, {
            headers: {
                authorization,
            },
        });
        Log.info(`${username} was added with role ${role} to DB`);
    } catch (e) {
        Log.warn(`${username} with role ${role} adding error`);
    }
};

const waitOnInitialData = async (authorization) => {
    const resources = [
        `${CREATE_USERS_API_URL}?limit=1`,
    ].map((url) => url.replace(/(:\/\/)/, '-get://'));

    const waitOnOptions = {
        resources,
        simultaneous: 1,
        interval: 500,
        timeout: 30000,
        tcpTimeout: 10000,
        validateStatus: () => true,
        headers: {
            authorization,
        },
    };
    await waitOn(waitOnOptions);
};

/**
 * init DB Data
 *
 * @TODO change to connect directly to redis
 *
 * @type {import('./plugins').NextPluginType}
 */
module.exports = (nextConfig, _nextComposePlugins = {}) => {
    const {
        env: {
            ADMIN_USERNAME, ADMIN_PASS, ADMIN_ROLE, JWT_SECRET,
        },
    } = nextConfig;

    (async () => {
        Log.wait('initial DB data...');
        const payload = {
            username: ADMIN_USERNAME,
            role: ADMIN_ROLE,
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 5 * 60 });
        const authorization = `JWT ${token}`;

        await waitOnInitialData(authorization);
        await addUsers(ADMIN_USERNAME, ADMIN_PASS, ADMIN_ROLE, authorization);
        Log.event('DB data loaded');
    })();

    return {};
};
