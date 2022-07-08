import dayjs from 'dayjs';

import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { checkBody } from 'lib/api/middleware/plugins/check-body';
import { handleApiError } from 'lib/api/error/handle-api-error';

import { WorkoutsCountType } from 'lib/models/workout';
import { createWorkout } from 'lib/api/db/workouts';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithBody, Validator } from 'lib/api/middleware/plugins/check-body';
import type { Workout, WorkoutCreateData, WorkoutCreateDataDB } from 'lib/models/workout';

export type CreateWorkoutRes = Workout;

const validateBody: Validator<WorkoutCreateData> = ({
    owner,
    name,
    countsType,
    countsValue,
    date,
    ...rest
}): boolean => (
    owner !== undefined && typeof owner === 'string' && /^[a-z.0-9_]{5,15}/.test(owner)
    && name !== undefined && typeof name === 'string' && /^[а-я]{3,30}/.test(name)
    && countsType !== undefined && Object.values(WorkoutsCountType).includes(countsType)
    && typeof countsValue === 'number' && countsValue > 0
    && typeof date === 'number' && dayjs.unix(date).isValid()
    && Object.keys(rest).length === 0
);

const createWorkoutAPI = async (req: NextReqWithBody<WorkoutCreateData>, res: Res<CreateWorkoutRes>): Promise<void> => {
    try {
        const { body } = req;

        const workoutCreate: WorkoutCreateDataDB = body;

        // const workout = await createWorkout(workoutCreate);

        res.status(200).json(workoutCreate);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    checkBody(validateBody),
    createWorkoutAPI,
);
