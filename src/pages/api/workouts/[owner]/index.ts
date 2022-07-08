import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import listWorkoutsAPI from 'lib/api/routes/workouts/list';
import createWorkoutAPI from 'lib/api/routes/workouts/create';

import type { NextApiResponse } from 'next';
import type { ListWorkoutsReq, ListWorkoutsRes } from 'lib/api/routes/workouts/list';
import type { CreateWorkoutReq, CreateWorkoutRes } from 'lib/api/routes/workouts/create';

const workouts = async (
    req: CreateWorkoutReq | ListWorkoutsReq,
    res: NextApiResponse<ListWorkoutsRes | CreateWorkoutRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await listWorkoutsAPI(req, res);
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
