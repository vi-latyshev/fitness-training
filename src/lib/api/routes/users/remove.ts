import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import { handleApiError } from 'lib/api/error/handle-api-error';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from 'lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';

export type RemoveUserReq = NextReqWithAuth & NextReqWithQueryIds<['username']>;
export type RemoveUserRes = void;

const removeUserAPI = async (_req: RemoveUserReq, res: Res<RemoveUserRes>) => {
    try {
        // @TODO
        // only for admin/coach?
        // remove user
        // remove workout of user
        // remove stats of user

        res.status(204).end();
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    verifyQueryId<['username']>(['username']),
    checkAuth(),
    removeUserAPI,
);
