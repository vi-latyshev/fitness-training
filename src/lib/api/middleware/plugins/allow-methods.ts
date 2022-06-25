import { APIError } from 'lib/api/error';

import type { Middleware } from '../with-middlewares';

type Methods = 'GET' | 'HEAD' | 'PUT' | 'PATCH' | 'POST' | 'DELETE';

export const allowMethods = (methods: Methods[]): Middleware => (req, res) => {
    const { method } = req;

    if (!methods.includes(method as Methods)) {
        res.setHeader('Allow', methods);
        throw new APIError(`Method ${method} Not Allowed`, 405);
    }
};
