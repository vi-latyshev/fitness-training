import jwt from 'jsonwebtoken';

import { APIError } from 'lib/api/error';

import { setCookie } from './set-cookie';

import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import type { User } from 'lib/models/user';

export type SignJWTPayload = Pick<User, 'username' | 'role'>;

const getExpDate = () => Date.now() + parseInt(process.env.JWT_EXPIRES_IN);

const JWT_COOKIE_KEY = 'JWT';

export const signJWT = (res: Res, payload: SignJWTPayload) => {
    const expiresIn = getExpDate();

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    setCookie(res, JWT_COOKIE_KEY, token, { maxAge: expiresIn - 60 });
};

export const verifyJWT = (token: string): SignJWTPayload | null => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET) as SignJWTPayload;
    } catch (e) {
        /**
         * @TODO add Sentry or smth else
         */
        console.error(`JWT Error: ${e}`); // eslint-disable-line no-console

        return null;
    }
};

export const checkAuthJWT = (req: Req): SignJWTPayload => {
    let token: string | undefined;

    const tokenCookie = req.cookies[JWT_COOKIE_KEY];
    const authHeader = req.headers.authorization;

    if (tokenCookie) {
        token = tokenCookie;
    } else {
        const [auth, tokenHeader] = authHeader?.trim()
            .split(/\s+/, 2)
            .map((str) => str.trim()) ?? ['JWT'];

        if (auth !== 'JWT') {
            throw new APIError('Invalid token', 401);
        }
        token = tokenHeader;
    }
    if (!token) {
        throw new APIError('Authorization token required', 401);
    }
    const payload = verifyJWT(token);

    if (payload === null) {
        throw new APIError('Token has expired or was forged', 403);
    }

    return payload;
};

export const removeJWT = (res: Res) => {
    setCookie(res, JWT_COOKIE_KEY, '', { maxAge: 0 });
};
