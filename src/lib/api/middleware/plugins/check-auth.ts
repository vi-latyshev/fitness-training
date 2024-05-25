import { checkAuthJWT, removeJWT } from 'lib/api/utils/jwt';
import { userRoleList } from 'lib/models/user';
import { APIError } from 'lib/api/error';

import type { NextApiRequest } from 'next';
import type { SignJWTPayload } from 'lib/api/utils/jwt';
import type { Middleware } from '../with-middlewares';

export type NextReqWithAuth = NextApiRequest & {
    auth: SignJWTPayload;
    authToken: string;
    authNoThrow?: boolean;
};

export const validateAuthPayload = (payload: SignJWTPayload): void => {
    const { username, role } = payload;

    if (
        username === undefined || typeof username !== 'string' || !(/^[a-z.0-9_]{5,15}/.test(username))
        || !userRoleList.includes(role)
    ) {
        throw new APIError('Token has invalid payload', 401);
    }
};

export const checkAuth = (noThrow = false): Middleware<NextReqWithAuth> => (req, res): void => {
    req.authNoThrow = noThrow;

    try {
        const { token, payload } = checkAuthJWT(req);

        validateAuthPayload(payload);

        req.auth = payload;
        req.authToken = token;
    } catch (e) {
        removeJWT(res);
        if (noThrow) {
            return;
        }
        throw e;
    }
};
