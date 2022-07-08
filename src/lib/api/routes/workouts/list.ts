import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { getWorkouts } from 'lib/api/db/workouts';

import type { NextApiRequest, NextApiResponse as Res } from 'next';
import type { ListWorkoutsDBParams, ListWorkoutsDBRes } from 'lib/models/workout';

type ListWorkoutsReq = NextApiRequest & {
    query: ListWorkoutsDBParams;
};

export type ListWorkoutsRes = ListWorkoutsDBRes;

const listWorkoutsAPI = async (req: ListWorkoutsReq, res: Res<ListWorkoutsRes>): Promise<void> => {
    try {
        const workouts = await getWorkouts(req.query);

        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(workouts);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    listWorkoutsAPI,
);
