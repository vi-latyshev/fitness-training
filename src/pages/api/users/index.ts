import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import listUsersAPI from 'lib/api/routes/users/list';
import createUserAPI from 'lib/api/routes/users/create';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { CreateUserRes } from 'lib/api/routes/users/create';
import type { ListUsersRes } from 'lib/api/routes/users/list';

const users = async (
    req: NextApiRequest,
    res: NextApiResponse<CreateUserRes | ListUsersRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await listUsersAPI(req, res);
            break;
        case 'POST':
            await createUserAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET', 'POST']),
    users,
);
