import { checkAuthJWT, removeJWT } from 'lib/api/utils/jwt';
import { UserRole } from 'lib/models/user';
import { APIError } from 'lib/api/error';

import type { NextApiRequest } from 'next';
import type { SignJWTPayload } from 'lib/api/utils/jwt';
import type { Middleware } from '../with-middlewares';

export type NextReqWithAuth = NextApiRequest & {
    auth: SignJWTPayload;
};

export const validateAuthPayload = (payload: SignJWTPayload): void => {
    const { username, role } = payload;

    if (
        username === undefined || typeof username !== 'string' || !(/^[a-z.0-9_]{5,15}/.test(username))
        || !Object.values(UserRole).includes(role)
    ) {
        throw new APIError('Token has invalid payload', 401);
    }
};

export const checkAuth = (noThrow = false): Middleware<NextReqWithAuth> => (req, res): void => {
    try {
        const payload = checkAuthJWT(req);

        validateAuthPayload(payload);

        req.auth = payload;
    } catch (e) {
        removeJWT(res);
        if (noThrow) {
            return;
        }
        throw e;
    }
};
