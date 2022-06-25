import { APIError } from 'lib/api/error';

import type { NextApiRequest } from 'next';
import type { DeepPartial } from 'types/utils';
import type { Middleware } from '../with-middlewares';

export type NextReqWithBody<T> = Omit<NextApiRequest, 'body'> & {
    body: T;
};

export type Validator<T extends Object> = (body: DeepPartial<T>) => boolean;

export const checkBody = <T extends Object>(validator: Validator<T>): Middleware => (req, _res) => {
    const body = req.body as T;

    if (typeof body !== 'object' || !validator(body)) {
        throw new APIError('Invalid request body', 400);
    }
};
