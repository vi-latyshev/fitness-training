import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import fetchWorkoutAPI from 'lib/api/routes/workouts/fetch';

import type { NextApiResponse } from 'next';
import type { FetchWorkoutReq, FetchWorkoutRes } from 'lib/api/routes/workouts/fetch';

const workout = async (
    req: FetchWorkoutReq,
    res: NextApiResponse<FetchWorkoutRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await fetchWorkoutAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET']),
    verifyQueryId<['owner', 'workoutId']>(['owner', 'workoutId']),
    workout,
);
