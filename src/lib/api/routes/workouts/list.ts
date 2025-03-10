import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { authRateLimit } from 'lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { getWorkouts } from 'lib/api/db/workouts';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from 'lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { ListWorkoutsDBParams, ListWorkoutsDBRes } from 'lib/models/workout';

export type ListWorkoutsReq = NextReqWithAuth & NextReqWithQueryIds<['owner']> & {
    query: ListWorkoutsDBParams;
};

export type ListWorkoutsRes = ListWorkoutsDBRes;

const listWorkoutsAPI = async (req: ListWorkoutsReq, res: Res<ListWorkoutsRes>): Promise<void> => {
    try {
        const { owner, ...params } = req.query;

        const workouts = await getWorkouts(owner, params);

        res.status(200).json(workouts);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    verifyQueryId<['owner']>(['owner']),
    authRateLimit(checkAuth()),
    listWorkoutsAPI,
);
