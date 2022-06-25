import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import { logoutUserAPI } from 'lib/api/routes/users/logout';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { LogoutUserRes } from 'lib/api/routes/users/logout';

const usersLogout = async (
    req: NextApiRequest,
    res: NextApiResponse<LogoutUserRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await logoutUserAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET']),
    checkAuth,
    usersLogout,
);
