import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import createUserAPI from 'lib/api/routes/users/create';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { CreateUserRes } from 'lib/api/routes/users/create';

const users = async (
    req: NextApiRequest,
    res: NextApiResponse<CreateUserRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'POST':
            await createUserAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['POST']),
    users,
);
