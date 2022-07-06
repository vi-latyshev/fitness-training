import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { getWorkouts } from 'lib/api/db/workouts';

import type { NextApiRequest, NextApiResponse as Res } from 'next';
import type { ListWorkoutsDBParams, ListWorkoutsDBRes } from 'lib/models/workout';
import type { User } from 'lib/models/user';

type ListWorkoutsQuery = ListWorkoutsDBParams & {
    owner: User['username'];
};

type ListWorkoutsReq = NextApiRequest & {
    query: NextApiRequest['query'] & ListWorkoutsQuery;
};

export type ListUsersRes = ListWorkoutsDBRes;

const listWorkoutsAPI = async (req: ListWorkoutsReq, res: Res<ListUsersRes>): Promise<void> => {
    try {
        const { owner, ...params } = req.query;

        const workouts = await getWorkouts(owner, params);

        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(workouts);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    listWorkoutsAPI,
);
