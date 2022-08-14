import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { ipRateLimit } from 'lib/api/middleware/plugins/ip-rate-limit';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import { checkBody } from 'lib/api/middleware/plugins/check-body';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { APIError } from 'lib/api/error';

import { workoutsCountTypeList } from 'lib/models/workout';
import { createWorkout } from 'lib/api/db/workouts';
import { UserRole } from 'lib/models/user';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from 'lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { NextReqWithBody, Validator } from 'lib/api/middleware/plugins/check-body';
import type { Workout, WorkoutCreateData, WorkoutCreateDataDB } from 'lib/models/workout';

// @TODO create type with generic as Query & Body
export type CreateWorkoutReq = Omit<NextReqWithAuth & NextReqWithQueryIds<['owner']>, 'body'> & NextReqWithBody<WorkoutCreateData>;
export type CreateWorkoutRes = Workout;

const validateBody: Validator<WorkoutCreateData> = ({
    name,
    countsType,
    countsValue,
    ...rest
}): boolean => (
    name !== undefined && typeof name === 'string' && /^[а-яА-Я]{3,30}/.test(name)
    && countsType !== undefined && workoutsCountTypeList.includes(countsType)
    && typeof countsValue === 'number' && countsValue > 0
    && Object.keys(rest).length === 0
);

const createWorkoutAPI = async (req: CreateWorkoutReq, res: Res<CreateWorkoutRes>): Promise<void> => {
    try {
        const { auth, body, query } = req;

        // can create workout only coach
        if (auth.role !== UserRole.COACH) {
            throw new APIError('Not enough rights', 403);
        }
        const workoutCreate: WorkoutCreateDataDB = {
            ...body,
            owner: query.owner,
            createdAt: Date.now(),
        };

        const workout = await createWorkout(workoutCreate);

        res.status(200).json(workout);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    verifyQueryId<['owner']>(['owner']),
    ipRateLimit,
    checkAuth(),
    checkBody(validateBody),
    createWorkoutAPI,
);
