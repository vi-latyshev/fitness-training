import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { getMe } from 'lib/api/routes/users/me';

import type { NextApiResponse } from 'next';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { MeUserRes } from 'lib/api/routes/users/me';

const me = async (
    req: NextReqWithAuth,
    res: NextApiResponse<MeUserRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await getMe(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET']),
    checkAuth,
    me,
);
