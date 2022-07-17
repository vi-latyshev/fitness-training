import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { checkBody } from 'lib/api/middleware/plugins/check-body';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { workoutsCountTypeList } from 'lib/models/workout';
import { updateWorkout } from 'lib/api/db/workouts';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from 'lib/api/middleware/plugins/check-query-id';
import type { NextReqWithBody, Validator } from 'lib/api/middleware/plugins/check-body';
import type { WorkoutCreateData, WorkoutUpdateData } from 'lib/models/workout';

export type UpdateWorkoutReq = Omit<NextReqWithQueryIds<['owner', 'workoutId']>, 'body'> & NextReqWithBody<WorkoutUpdateData>;
export type UpdateWorkoutRes = void;

const validateBody: Validator<WorkoutCreateData> = ({
    isDone,
    countsType,
    countsValue,
    ...rest
}): boolean => (
    (
        (isDone !== undefined && typeof isDone === 'boolean')
        || (countsType !== undefined && workoutsCountTypeList.includes(countsType))
        || (typeof countsValue === 'number' && countsValue > 0)
    )
    && Object.keys(rest).length === 0
);

const updateWorkoutAPI = async (req: UpdateWorkoutReq, res: Res<UpdateWorkoutRes>): Promise<void> => {
    try {
        const { body, query } = req;
        const { owner, workoutId } = query;

        const workoutUpdate: WorkoutUpdateData = body;

        await updateWorkout(owner, workoutId, workoutUpdate);

        res.status(204).end();
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    verifyQueryId<['owner', 'workoutId']>(['owner', 'workoutId']),
    checkBody(validateBody),
    updateWorkoutAPI,
);
