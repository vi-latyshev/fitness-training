import { handleApiError } from '../error/handle-api-error';

import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

export type Middleware<R extends Req = Req> = (req: R, res: Res) => Promise<void> | void;

export type MiddlewaresRet = (req: Req, res: Res) => Promise<void>;

export const withMiddleware = <R extends Req>(...middlewares: Middleware<R>[]): MiddlewaresRet => (
    async (req, res) => {
        try {
            // eslint-disable-next-line no-restricted-syntax
            for (const middleware of middlewares) {
                // eslint-disable-next-line no-await-in-loop
                await middleware(req as R, res);
            }
        } catch (e) {
            handleApiError(e, res);
        }
    }
);
