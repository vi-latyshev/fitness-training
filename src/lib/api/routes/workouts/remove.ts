import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { verifyQueryId } from '@/lib/api/middleware/plugins/check-query-id';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { removeWorkout } from '@/lib/api/db/workouts';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from '@/lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';

export type RemoveWorkoutReq = NextReqWithAuth & NextReqWithQueryIds<['owner', 'workoutId']>;
export type RemoveWorkoutRes = void;

const removeWorkoutAPIHandler = async (req: RemoveWorkoutReq, res: Res<RemoveWorkoutRes>): Promise<void> => {
    try {
        const { owner, workoutId } = req.query;

        await removeWorkout(owner, workoutId);

        res.status(204).end();
    } catch (e) {
        handleApiError(e, res);
    }
};

export const removeWorkoutAPI = withMiddleware(
    verifyQueryId<['owner', 'workoutId']>(['owner', 'workoutId']),
    authRateLimit(checkAuth()),
    removeWorkoutAPIHandler,
);
