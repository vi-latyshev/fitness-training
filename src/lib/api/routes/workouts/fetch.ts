import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { verifyQueryId } from '@/lib/api/middleware/plugins/check-query-id';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { getWorkout } from '@/lib/api/db/workouts';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from '@/lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';
import type { Workout } from '@/lib/models/workout';

export type FetchWorkoutReq = NextReqWithAuth & NextReqWithQueryIds<['owner', 'workoutId']>;
export type FetchWorkoutRes = Workout;

const fetchWorkoutAPIHandler = async (req: FetchWorkoutReq, res: Res<FetchWorkoutRes>): Promise<void> => {
    try {
        const { owner, workoutId } = req.query;

        const workout = await getWorkout(owner, workoutId);

        res.status(200).json(workout);
    } catch (e) {
        handleApiError(e, res);
    }
};

export const fetchWorkoutAPI = withMiddleware(
    verifyQueryId<['owner', 'workoutId']>(['owner', 'workoutId']),
    authRateLimit(checkAuth()),
    fetchWorkoutAPIHandler,
);
