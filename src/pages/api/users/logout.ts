import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import { logoutUserAPI } from 'lib/api/routes/users/logout';

import type { NextApiResponse } from 'next';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { LogoutUserRes } from 'lib/api/routes/users/logout';

const usersLogout = async (
    req: NextReqWithAuth,
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
    usersLogout,
);
