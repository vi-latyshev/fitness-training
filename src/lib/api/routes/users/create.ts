import sha1 from 'sha1';

import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { checkBody } from '@/lib/api/middleware/plugins/check-body';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { createUser } from '@/lib/api/db/users';
import { signJWT } from '@/lib/api/utils/jwt';
import { APIError } from '@/lib/api/error';
import { UserRole, userRoleList } from '@/lib/models/user';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';
import type { NextReqWithBody, Validator } from '@/lib/api/middleware/plugins/check-body';
import type { User, UserRegisterData, UserRegisterDBData } from '@/lib/models/user';

type SetPasswordReq = Partial<Omit<NextReqWithAuth, 'body'>> & NextReqWithBody<UserRegisterData>;
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
 * - firstName
 *      - min-length - 1
 *      - max-length - 50
 * - lastName
 *      - min-length - 1
 *      - max-length - 50
 * - role
 *      - only for Admin role
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
        role,
        ...metaRest
    } = {},
    ...rest
}) => (
    username !== undefined && typeof username === 'string' && /^[a-z.0-9_]{5,15}/.test(username)
    && password !== undefined && typeof password === 'string' && password.length >= 5 && password.length <= 30
    && firstName !== undefined && typeof firstName === 'string' && firstName.length >= 1 && firstName.length <= 50
    && lastName !== undefined && typeof password === 'string' && lastName.length >= 1 && lastName.length <= 50
    && (role === undefined || userRoleList.includes(role))
    && Object.keys(rest).length === 0 && Object.keys(authRest).length === 0 && Object.keys(metaRest).length === 0
);

const createUserAPI = async (req: SetPasswordReq, res: Res<CreateUserRes>): Promise<void> => {
    try {
        const { body, auth: userAuth } = req;

        // only for admin
        if (body.meta.role && userAuth?.role !== UserRole.ADMIN) {
            throw new APIError('Not enough rights', 403);
        }
        const auth: UserRegisterDBData['auth'] = {
            ...body.auth,
            password: sha1(body.auth.password), // pass in sha1 hash
        };
        const meta: UserRegisterDBData['meta'] = {
            ...body.meta,
            username: body.auth.username,
            role: body.meta.role ?? UserRole.MASTER,
            createdAt: Date.now(),
        };
        const user = await createUser({ auth, meta });
        const { username, role } = user;

        if (userAuth === undefined) {
            await signJWT(res, { username, role });
        }

        res.status(200).json(user);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    authRateLimit(checkAuth(true)),
    checkBody(validateBody),
    createUserAPI,
);
