import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import setPasswordAPI from 'lib/api/routes/users/password';

import type { NextApiResponse } from 'next';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { SetPasswordRes } from 'lib/api/routes/users/password';

const password = async (
    req: NextReqWithAuth,
    res: NextApiResponse<SetPasswordRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'PATCH':
            await setPasswordAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['PATCH']),
    checkAuth,
    password,
);
