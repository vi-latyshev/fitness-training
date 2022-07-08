import dayjs from 'dayjs';

import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { checkBody } from 'lib/api/middleware/plugins/check-body';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { handleApiError } from 'lib/api/error/handle-api-error';

import { WorkoutsCountType } from 'lib/models/workout';
import { createWorkout } from 'lib/api/db/workouts';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from 'lib/api/middleware/plugins/check-query-id';
import type { NextReqWithBody, Validator } from 'lib/api/middleware/plugins/check-body';
import type { Workout, WorkoutCreateData, WorkoutCreateDataDB } from 'lib/models/workout';

export type CreateWorkoutReq = NextReqWithQueryIds<['owner']> & NextReqWithBody<WorkoutCreateData>;
export type CreateWorkoutRes = Workout;

const validateBody: Validator<WorkoutCreateData> = ({
    name,
    countsType,
    countsValue,
    date,
    ...rest
}): boolean => (
    name !== undefined && typeof name === 'string' && /^[а-я]{3,30}/.test(name)
    && countsType !== undefined && Object.values(WorkoutsCountType).includes(countsType)
    && typeof countsValue === 'number' && countsValue > 0
    && typeof date === 'number' && dayjs.unix(date).isValid()
    && Object.keys(rest).length === 0
);

const createWorkoutAPI = async (req: CreateWorkoutReq, res: Res<CreateWorkoutRes>): Promise<void> => {
    try {
        const { body, query } = req;

        const workoutCreate: WorkoutCreateDataDB = {
            ...body,
            owner: query.owner,
        };

        const workout = await createWorkout(workoutCreate);

        res.status(200).json(workout);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    verifyQueryId<['owner']>(['owner']),
    checkBody(validateBody),
    createWorkoutAPI,
);
