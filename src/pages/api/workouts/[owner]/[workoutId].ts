import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import fetchWorkoutAPI from 'lib/api/routes/workouts/fetch';
import removeWorkoutAPI from 'lib/api/routes/workouts/remove';

import type { NextApiResponse } from 'next';
import type { FetchWorkoutReq, FetchWorkoutRes } from 'lib/api/routes/workouts/fetch';
import type { RemoveWorkoutReq, RemoveWorkoutRes } from 'lib/api/routes/workouts/remove';

const workout = async (
    req: FetchWorkoutReq | RemoveWorkoutReq,
    res: NextApiResponse<FetchWorkoutRes | RemoveWorkoutRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await fetchWorkoutAPI(req, res);
            break;
        case 'DELETE':
            await removeWorkoutAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET', 'DELETE']),
    verifyQueryId<['owner', 'workoutId']>(['owner', 'workoutId']),
    workout,
);
