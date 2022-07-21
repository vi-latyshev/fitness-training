import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { APIError } from 'lib/api/error';

import { User, UserRole } from 'lib/models/user';
import { getUsers } from 'lib/api/db/users';
import { getCountWorkouts } from 'lib/api/db/workouts';
import { getCountStats, getDiffStats } from 'lib/api/db/stats';

import type { NextApiResponse as Res } from 'next';
import type { Pagination, PaginationResp } from 'lib/api/redis/types';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { WorkoutCountRes } from 'lib/models/workout';
import type { DiffStatsData, StatsCountRes } from 'lib/models/stats';

export type FetchFullStatsUserReq = NextReqWithAuth & {
    query: Pagination<User>;
};
export type FetchFullStatsUserResData = {
    user: User;
    wourkoutsCount: WorkoutCountRes;
    statsCount: StatsCountRes;
    statsDiff: DiffStatsData;
};
export type FetchFullStatsUserRes = PaginationResp<FetchFullStatsUserResData>;

const fetchFullStatsUserAPI = async (req: FetchFullStatsUserReq, res: Res<FetchFullStatsUserRes>): Promise<void> => {
    try {
        const { role } = req.auth;

        if (role !== UserRole.COACH) {
            throw new APIError('Not enough rights', 403);
        }
        const params: Pagination<User> = {
            ...req.query,
            filter: {
                ...req.query.filter,
                role: UserRole.TRAINEE,
            },
        };
        const usersData = await getUsers(params);

        const promisesData = usersData.items.map(async (user) => {
            const { username } = user;

            const [
                wourkoutsCount,
                statsCount,
                statsDiff,
            ] = await Promise.all([
                getCountWorkouts(username),
                getCountStats(username),
                getDiffStats(username),
            ]);

            const userData: FetchFullStatsUserResData = {
                user,
                wourkoutsCount,
                statsCount,
                statsDiff,
            };

            return userData;
        });

        const items = await Promise.all(promisesData);

        const data: FetchFullStatsUserRes = {
            ...usersData,
            items,
        };

        res.status(200).json(data);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    checkAuth(),
    fetchFullStatsUserAPI,
);
