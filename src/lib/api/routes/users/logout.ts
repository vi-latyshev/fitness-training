import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { authRateLimit } from 'lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { removeJWT } from 'lib/api/utils/jwt';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';

export type LogoutUserRes = void;

export const logoutUserAPI = async (_req: NextReqWithAuth, res: Res<LogoutUserRes>): Promise<void> => {
    try {
        removeJWT(res);
        res.status(204).end();
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    authRateLimit(checkAuth()),
    logoutUserAPI,
);
