import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { getUser } from 'lib/api/db/users';
import { handleApiError } from 'lib/api/error/handle-api-error';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryId } from 'lib/api/middleware/plugins/check-query-id';
import type { User } from 'lib/models/user';

export type FetchUserRes = User;

const fetchUserAPI = async (req: NextReqWithQueryId, res: Res<FetchUserRes>): Promise<void> => {
    try {
        const { id: username } = req.query;

        const user = await getUser(username);

        res.status(200).json(user);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    fetchUserAPI,
);
