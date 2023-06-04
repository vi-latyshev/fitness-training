import { serialize } from 'cookie';

import type { NextApiResponse } from 'next';
import type { CookieSerializeOptions } from 'cookie';

export const setCookie = (
    res: NextApiResponse,
    name: string,
    value: unknown,
    options: CookieSerializeOptions = {},
): void => {
    const cookieOptions: CookieSerializeOptions = { ...options };

    const stringValue = typeof value === 'object'
        ? `j:${JSON.stringify(value)}`
        : String(value);

    if (typeof cookieOptions.maxAge === 'number') {
        cookieOptions.expires = new Date(Date.now() + cookieOptions.maxAge * 1000);
    }

    res.setHeader('Set-Cookie', serialize(name, stringValue, {
        httpOnly: true,
        secure: process.env.IS_HOST_SECURE,
        sameSite: 'strict',
        path: '/api',
        ...cookieOptions,
    }));
};
