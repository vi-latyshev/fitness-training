import { APIError } from 'lib/api/error';

import type { NextApiRequest } from 'next';
import type { Middleware } from '../with-middlewares';

export type NextReqWithQueryId = NextApiRequest & {
    query: NextApiRequest['query'] & {
        id: string;
    };
};

export const verifyQueryId: Middleware<NextReqWithQueryId> = (req, _res) => {
    const { query } = req;

    if (typeof query.id !== 'string') {
        throw new APIError('Expected query to contain an ID param with type string', 400);
    }
};
