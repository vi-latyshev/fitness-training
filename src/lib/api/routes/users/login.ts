import sha1 from 'sha1';

import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { checkBody } from 'lib/api/middleware/plugins/check-body';
import { APIError } from 'lib/api/error';
import { signJWT } from 'lib/api/utils/jwt';
import { getAuthUser } from 'lib/api/db/users';
import { handleApiError } from 'lib/api/error/handle-api-error';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithBody, Validator } from 'lib/api/middleware/plugins/check-body';
import type { UserAuth } from 'lib/models/user';

export type LoginUserRes = void;

/**
 * hard code for validation
 *
 * - username:
 *      - min-length - 5
 *      - max-length - 50
 * - password
 *      - min-length - 3
 *      - max-length - 15
 * - no additional fields
 */
const validateBody: Validator<UserAuth> = ({
    username,
    password,
    ...rest
}) => (
    username !== undefined && typeof username === 'string' && username.length >= 5 && username.length <= 50
    && password !== undefined && typeof password === 'string' && password.length > 3 && password.length < 30
    && Object.keys(rest).length === 0
);

const loginUserAPI = async (req: NextReqWithBody<UserAuth>, res: Res<LoginUserRes>): Promise<void> => {
    try {
        const { body } = req;
        const { username } = body;

        const { password } = await getAuthUser(username);

        if (sha1(body.password) !== password) {
            throw new APIError('Incorrect credentials', 403);
        }
        signJWT(res, { username });

        res.status(204).end();
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    checkBody(validateBody),
    loginUserAPI,
);
