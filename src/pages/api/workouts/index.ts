import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import createWorkoutAPI from 'lib/api/routes/workouts/create';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { CreateWorkoutRes } from 'lib/api/routes/workouts/create';
import type { ListWorkoutsDBRes } from 'lib/models/workout';

const workouts = async (
    req: NextApiRequest,
    res: NextApiResponse<CreateWorkoutRes | ListWorkoutsDBRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            // await listUsersAPI(req, res);
            break;
        case 'POST':
            await createWorkoutAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET', 'POST']),
    workouts,
);
