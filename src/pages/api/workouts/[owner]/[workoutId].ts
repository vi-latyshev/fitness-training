import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { allowMethods } from '@/lib/api/middleware/plugins/allow-methods';
import { fetchWorkoutAPI } from '@/lib/api/routes/workouts/fetch';
import { updateWorkoutAPI } from '@/lib/api/routes/workouts/update';
import { removeWorkoutAPI } from '@/lib/api/routes/workouts/remove';

import type { NextApiResponse } from 'next';
import type { FetchWorkoutReq, FetchWorkoutRes } from '@/lib/api/routes/workouts/fetch';
import type { UpdateWorkoutReq, UpdateWorkoutRes } from '@/lib/api/routes/workouts/update';
import type { RemoveWorkoutReq, RemoveWorkoutRes } from '@/lib/api/routes/workouts/remove';

const workout = async (
    req: FetchWorkoutReq | UpdateWorkoutReq | RemoveWorkoutReq,
    res: NextApiResponse<FetchWorkoutRes | UpdateWorkoutRes | RemoveWorkoutRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await fetchWorkoutAPI(req, res);
            break;
        case 'PATCH':
            await updateWorkoutAPI(req, res);
            break;
        case 'DELETE':
            await removeWorkoutAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET', 'PATCH', 'DELETE']),
    workout,
);
