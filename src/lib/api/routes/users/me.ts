import { getUser } from 'lib/api/db/users';
import { handleApiError } from 'lib/api/error/handle-api-error';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { User } from 'lib/models/user';

export type MeUserRes = User;

export const getMeAPI = async (req: NextReqWithAuth, res: Res<MeUserRes>): Promise<void> => {
    try {
        const { username } = req.auth;

        const user = await getUser(username);

        res.setHeader('Cache-Control', 'max-age=59, s-maxage=60');
        res.status(200).json(user);
    } catch (e) {
        handleApiError(e, res);
    }
};
