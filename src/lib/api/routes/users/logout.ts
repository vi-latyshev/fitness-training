import { handleApiError } from 'lib/api/error/handle-api-error';
import { removeJWT } from 'lib/api/utils/jwt';

import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

export type LogoutUserRes = void;

export const logoutUserAPI = async (_req: Req, res: Res<LogoutUserRes>): Promise<void> => {
    try {
        removeJWT(res);
        res.status(204).end();
    } catch (e) {
        handleApiError(e, res);
    }
};
