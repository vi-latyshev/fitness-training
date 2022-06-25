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
 *      - no wrong role
 *      - default UserRole.TRAINEE
 * - no additional fields
 */
const validateBody: Validator<UserAuthData> = ({
    auth: {
        username,
        password,
        ...authRest
    } = {},
    meta: {
        role = UserRole.TRAINEE,
        ...metaRest
    } = {},
    ...rest
}) => (
    username !== undefined && typeof username === 'string' && username.length >= 5 && username.length <= 50
    && password !== undefined && typeof password === 'string' && password.length >= 5 && password.length < 30
    && Object.values(UserRole).includes(role)
    && Object.keys(rest).length === 0 && Object.keys(authRest).length === 0 && Object.keys(metaRest).length === 0
);

const createUserAPI = async (req: NextReqWithBody<UserAuthData>, res: Res<CreateUserRes>): Promise<void> => {
    try {
        const { body } = req;

        body.meta = {
            ...body.meta,
            username: body.auth.username,
        };
        // pass in sha1 hash
        body.auth.password = sha1(body.auth.password);
        body.meta.role = body.meta.role ?? UserRole.TRAINEE;

        if (body.meta.role === UserRole.COACH) {
            // init values
            body.meta.trainees = [];
        }
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
