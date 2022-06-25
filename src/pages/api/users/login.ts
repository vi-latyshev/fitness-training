import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import loginUserAPI from 'lib/api/routes/users/login';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { LoginUserRes } from 'lib/api/routes/users/login';

const usersLogin = async (
    req: NextApiRequest,
    res: NextApiResponse<LoginUserRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'POST':
            await loginUserAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['POST']),
    usersLogin,
);
