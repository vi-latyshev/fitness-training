import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import countWorkoutsAPI from 'lib/api/routes/workouts/count';

import type { NextApiResponse } from 'next';
import type { CountWorkoutReq, CountWorkoutRes } from 'lib/api/routes/workouts/count';

const countWorkouts = async (
    req: CountWorkoutReq,
    res: NextApiResponse<CountWorkoutRes>
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await countWorkoutsAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET']),
    countWorkouts,
);
