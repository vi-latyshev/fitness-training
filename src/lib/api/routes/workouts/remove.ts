import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { ipRateLimit } from 'lib/api/middleware/plugins/ip-rate-limit';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { removeWorkout } from 'lib/api/db/workouts';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from 'lib/api/middleware/plugins/check-query-id';

export type RemoveWorkoutReq = NextReqWithQueryIds<['owner', 'workoutId']>;
export type RemoveWorkoutRes = void;

const removeWorkoutAPI = async (req: RemoveWorkoutReq, res: Res<RemoveWorkoutRes>): Promise<void> => {
    try {
        const { owner, workoutId } = req.query;

        await removeWorkout(owner, workoutId);

        res.status(204).end();
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    verifyQueryId<['owner', 'workoutId']>(['owner', 'workoutId']),
    ipRateLimit,
    removeWorkoutAPI,
);
