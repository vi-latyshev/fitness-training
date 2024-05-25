import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { ipRateLimit } from 'lib/api/middleware/plugins/ip-rate-limit';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { getWorkout } from 'lib/api/db/workouts';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from 'lib/api/middleware/plugins/check-query-id';
import type { Workout } from 'lib/models/workout';

export type FetchWorkoutReq = NextReqWithQueryIds<['owner', 'workoutId']>;
export type FetchWorkoutRes = Workout;

const fetchWorkoutAPI = async (req: FetchWorkoutReq, res: Res<FetchWorkoutRes>): Promise<void> => {
    try {
        const { owner, workoutId } = req.query;

        const workout = await getWorkout(owner, workoutId);

        res.status(200).json(workout);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    verifyQueryId<['owner', 'workoutId']>(['owner', 'workoutId']),
    ipRateLimit,
    fetchWorkoutAPI,
);
