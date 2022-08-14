import type { NextApiRequest } from 'next';

export const getReqIP = (request: NextApiRequest) => {
    const xff = request.headers['x-forwarded-for'];

    if (!xff) {
        if (process.env.NODE_ENV !== 'development') {
            /**
             * @TODO add Sentry or smth else
             */
            console.error('Not found XFF header. Headers:', JSON.stringify(request.headers)); // eslint-disable-line no-console
        }

        return '127.0.0.1';
    }
    if (Array.isArray(xff)) {
        return xff[0];
    }

    return xff.split(',')[0];
};
