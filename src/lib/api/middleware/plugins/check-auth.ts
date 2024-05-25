import { checkAuthJWT } from 'lib/api/utils/jwt';
import { APIError } from 'lib/api/error';

import type { NextApiRequest } from 'next';
import type { SignJWTPayload } from 'lib/api/utils/jwt';
import type { Middleware } from '../with-middlewares';

export type NextReqWithAuth = NextApiRequest & {
    auth: SignJWTPayload;
    authToken: string;
};

const UPDATE_AUTH_EXP_JWT = true;

export const checkAuth = (noThrow = false): Middleware<NextReqWithAuth> => async (req, res): Promise<void> => {
    try {
        const { token, payload } = await checkAuthJWT(req, res, UPDATE_AUTH_EXP_JWT);

        req.authToken = token;
        req.auth = payload;
    } catch (e) {
        if (e instanceof APIError && noThrow) {
            return;
        }
        throw e;
    }
};
