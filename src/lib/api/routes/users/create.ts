import sha1 from 'sha1';

import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { checkBody } from 'lib/api/middleware/plugins/check-body';
import { createUser } from 'lib/api/db/users';
import { signJWT } from 'lib/api/utils/jwt';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { UserRole } from 'lib/models/user';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithBody, Validator } from 'lib/api/middleware/plugins/check-body';
import type { User, UserAuthData } from 'lib/models/user';

export type CreateUserRes = User;

/**
 * hard code for validation
 *
 * - username:
 *      - min-length - 5
 *      - max-length - 50
 * - password
 *      - min-length - 3
 *      - max-length - 15
 * - role
 *      - wrong role
 *      - default UserRole.TRAINEE
 * - height
 *      - min-length - 0
 *      - max-length - 400
 * - weight
 *      - min-length - 0
 *      - max-length - 400
 * - no additional fields
 */
const validateBody: Validator<UserAuthData> = ({
    auth: {
        username,
        password,
        ...authRest
    } = {},
    meta: {
        role,
        height,
        weight,
        ...metaRest
    } = {},
    ...rest
}) => (
    username !== undefined && typeof username === 'string' && username.length > 5 && username.length <= 50
    && password !== undefined && typeof password === 'string' && password.length > 3 && password.length < 30
    && role !== undefined && Object.values(UserRole).includes(role)
    && height !== undefined && typeof height === 'number' && height > 0 && height < 400
    && weight !== undefined && typeof weight === 'number' && weight > 0 && weight < 400
    && Object.keys(rest).length === 0 && Object.keys(authRest).length === 0 && Object.keys(metaRest).length === 0
);

const createUserAPI = async (req: NextReqWithBody<UserAuthData>, res: Res<CreateUserRes>): Promise<void> => {
    try {
        const { body } = req;
        // pass to hash
        body.auth.password = sha1(body.auth.password);

        const { username } = await createUser(body);

        signJWT(res, { username });

        res.status(204).end();
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    checkBody(validateBody),
    createUserAPI,
);
