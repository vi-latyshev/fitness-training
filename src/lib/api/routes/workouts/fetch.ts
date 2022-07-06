import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { handleApiError } from 'lib/api/error/handle-api-error';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from 'lib/api/middleware/plugins/check-query-id';
import type { Workout } from 'lib/models/workout';

type FetchWorkoutReq = NextReqWithQueryIds<['workoutId']>;
export type FetchWorkoutRes = Workout;

const fetchWorkoutAPI = async (req: FetchWorkoutReq, res: Res<FetchWorkoutRes>): Promise<void> => {
    try {
        const { workoutId } = req.query;


    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    fetchWorkoutAPI,
);
