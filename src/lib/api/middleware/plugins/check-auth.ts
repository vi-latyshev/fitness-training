import { checkAuthJWT } from 'lib/api/utils/jwt';

import type { NextApiRequest } from 'next';
import type { SignJWTPayload } from 'lib/api/utils/jwt';
import type { Middleware } from '../with-middlewares';

export type NextReqWithAuth = NextApiRequest & {
    auth: SignJWTPayload;
};

export const checkAuth: Middleware<NextReqWithAuth> = (req, _res) => {
    const payload = checkAuthJWT(req);

    req.auth = payload;
};
