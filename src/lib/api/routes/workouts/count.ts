import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { getCountWorkouts } from 'lib/api/db/workouts';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from 'lib/api/middleware/plugins/check-query-id';

export type CountWorkoutReq = NextReqWithQueryIds<['owner']>;
export type CountWorkoutRes = number;

const countWorkoutsAPI = async (req: CountWorkoutReq, res: Res<CountWorkoutRes>): Promise<void> => {
    try {
        const { owner } = req.query;

        const count = await getCountWorkouts(owner);

        res.status(200).json(count);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    verifyQueryId<['owner']>(['owner']),
    countWorkoutsAPI,
);
