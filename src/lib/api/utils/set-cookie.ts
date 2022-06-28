import { serialize } from 'cookie';

import type { NextApiResponse } from 'next';
import type { CookieSerializeOptions } from 'cookie';

export const setCookie = (
    res: NextApiResponse,
    name: string,
    value: unknown,
    options: CookieSerializeOptions = {},
) => {
    const stringValue = typeof value === 'object'
        ? `j:${JSON.stringify(value)}`
        : String(value);

    if (typeof options.maxAge === 'number') {
        options.expires = new Date(Date.now() + options.maxAge * 1000);
    }

    res.setHeader('Set-Cookie', serialize(name, stringValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/api',
        ...options,
    }));
};
