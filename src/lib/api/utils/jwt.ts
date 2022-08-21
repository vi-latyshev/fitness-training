import jwt from 'jsonwebtoken';

import { checkAuthToken, removeAuthToken, saveAuthToken } from 'lib/api/db/auth-tokens';
import { userRoleList } from 'lib/models/user';
import { APIError } from 'lib/api/error';

import { setCookie } from './set-cookie';

import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import type { User } from 'lib/models/user';

export type SignJWTPayload = Pick<User, 'username' | 'role'> & {
    apiLimit?: number;
    apiTimeframe?: number;
};

type CheckAuthJWT = {
    token: string;
    payload: SignJWTPayload;
};

const getExpDate = () => parseInt(process.env.JWT_EXPIRES_IN);

const JWT_COOKIE_KEY = 'JWT';

const updateJWTExp = async (token: string, res: Res) => {
    const expiresIn = getExpDate();

    setCookie(res, JWT_COOKIE_KEY, token, { maxAge: expiresIn - 1 });
    await saveAuthToken(token, expiresIn);
};

export const signJWT = async (res: Res, payload: SignJWTPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    await updateJWTExp(token, res);
};

const verifyJWT = async (token: string): Promise<SignJWTPayload> => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET) as SignJWTPayload;
    } catch (e) {
        throw new APIError('Token has invalid payload', 401);
    }
};

const validatePayload = (payload: SignJWTPayload) => {
    const { username, role } = payload;

    if (
        username === undefined || typeof username !== 'string' || !(/^[a-z.0-9_]{5,15}/.test(username))
        || typeof role !== 'string' || !userRoleList.includes(role)
    ) {
        throw new APIError('Token has invalid payload', 401);
    }
};

export const removeJWT = async (res: Res, token: string) => {
    setCookie(res, JWT_COOKIE_KEY, '', { maxAge: 0, expires: new Date(1) });

    if (!token) {
        return;
    }
    await removeAuthToken(token);
};

export const checkAuthJWT = async (req: Req, res: Res, updateAuthExp = false): Promise<CheckAuthJWT> => {
    let token: string | undefined;

    const tokenCookie = req.cookies[JWT_COOKIE_KEY];
    const authHeader = req.headers.authorization;

    if (tokenCookie) {
        token = tokenCookie;
    } else {
        const [auth, tokenHeader] = authHeader?.trim()
            .split(/\s+/, 2)
            .map((str) => str.trim()) ?? [JWT_COOKIE_KEY];

        if (auth !== JWT_COOKIE_KEY) {
            throw new APIError('Invalid token', 401);
        }
        token = tokenHeader;
    }
    if (!token) {
        throw new APIError('Authorization token required', 401);
    }
    try {
        const payload = await verifyJWT(token);

        validatePayload(payload);

        await checkAuthToken(token);

        if (updateAuthExp) {
            await updateJWTExp(token, res);
        }

        return {
            token,
            payload,
        };
    } catch (e) {
        await removeJWT(res, token);

        throw e;
    }
};
