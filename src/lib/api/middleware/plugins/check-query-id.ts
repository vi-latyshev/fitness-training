import { APIError } from '@/lib/api/error';

import type { NextApiRequest } from 'next';
import type { Middleware } from '../with-middlewares';

export type NextReqWithQueryIds<IDs extends string[]> = NextApiRequest & {
    query: {
        [T in IDs[number]]: string;
    };
};

export const verifyQueryId = <IDs extends string[]>(
    ids: IDs
): Middleware<NextReqWithQueryIds<IDs>> => (req, _res) => {
        const { query } = req;

        const isInvalidQuery = ids.every((id) => typeof query[id as IDs[number]] !== 'string');

        if (isInvalidQuery) {
            throw new APIError('Expected query to contain an ID param with type string', 400);
        }
    };
