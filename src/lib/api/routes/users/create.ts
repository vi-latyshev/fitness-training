import sha1 from 'sha1';

import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { checkBody } from 'lib/api/middleware/plugins/check-body';
import { createUser } from 'lib/api/db/users';
import { signJWT } from 'lib/api/utils/jwt';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { User, UserRole } from 'lib/models/user';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithBody, Validator } from 'lib/api/middleware/plugins/check-body';
import type { UserRegisterData, UserRegisterDBData } from 'lib/models/user';

export type CreateUserRes = User;

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
 * - role
 *      - no wrong role
 *      - default UserRole.TRAINEE
 * - firstName
 *      - min-length - 1
 *      - max-length - 50
 * - lastName
 *      - min-length - 1
 *      - max-length - 50
 * - no additional fields
 */
const validateBody: Validator<UserRegisterData> = ({
    auth: {
        username,
        password,
        ...authRest
    } = {},
    meta: {
        firstName,
        lastName,
        ...metaRest
    } = {},
    ...rest
}) => (
    username !== undefined && typeof username === 'string' && /^[a-z.0-9_]{5,15}/
    && password !== undefined && typeof password === 'string' && password.length >= 5 && password.length <= 30
    && firstName !== undefined && typeof firstName === 'string' && firstName.length >= 1 && firstName.length <= 50
    && lastName !== undefined && typeof password === 'string' && lastName.length >= 1 && lastName.length <= 50
    && Object.keys(rest).length === 0 && Object.keys(authRest).length === 0 && Object.keys(metaRest).length === 0
);

const createUserAPI = async (req: NextReqWithBody<UserRegisterData>, res: Res<CreateUserRes>): Promise<void> => {
    try {
        const { body } = req;

        const auth: UserRegisterDBData['auth'] = {
            ...body.auth,
            password: sha1(body.auth.password), // pass in sha1 hash
        };
        const meta: UserRegisterDBData['meta'] = {
            ...body.meta,
            username: body.auth.username,
            role: UserRole.TRAINEE,
        };
        const user = await createUser({ auth, meta });
        const { username, role } = user;

        signJWT(res, { username, role });

        res.status(200).json(user);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    checkBody(validateBody),
    createUserAPI,
);
