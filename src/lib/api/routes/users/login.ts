import sha1 from 'sha1';

import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { ipRateLimit } from 'lib/api/middleware/plugins/ip-rate-limit';
import { checkBody } from 'lib/api/middleware/plugins/check-body';
import { APIError } from 'lib/api/error';
import { signJWT } from 'lib/api/utils/jwt';
import { getAuthUser, getUser } from 'lib/api/db/users';
import { handleApiError } from 'lib/api/error/handle-api-error';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithBody, Validator } from 'lib/api/middleware/plugins/check-body';
import type { User, UserAuth } from 'lib/models/user';

export type LoginUserRes = User;

/**
 * hard code for validation
 *
 * - username:
 *      - min-length - 5
 *      - max-length - 15
 *      - symbols: a-z, numbers and dots
 * - password
 *      - min-length - 5
 *      - max-length - 30
 * - no additional fields
 */
const validateBody: Validator<UserAuth> = ({
    username,
    password,
    ...rest
}) => (
    username !== undefined && typeof username === 'string' && /^[a-z.0-9_]{5,15}/.test(username)
    && password !== undefined && typeof password === 'string' && password.length >= 5 && password.length <= 30
    && Object.keys(rest).length === 0
);

const loginUserAPI = async (req: NextReqWithBody<UserAuth>, res: Res<LoginUserRes>): Promise<void> => {
    try {
        const { username, password } = req.body;

        const { password: currPassDB } = await getAuthUser(username);

        if (sha1(password) !== currPassDB) {
            throw new APIError('Incorrect credentials', 403);
        }
        const user = await getUser(username);
        const { role } = user;

        await signJWT(res, { username, role });

        res.status(200).json(user);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    ipRateLimit,
    checkBody(validateBody),
    loginUserAPI,
);
