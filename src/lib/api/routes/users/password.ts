import sha1 from 'sha1';

import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { ipRateLimit } from 'lib/api/middleware/plugins/ip-rate-limit';
import { checkBody } from 'lib/api/middleware/plugins/check-body';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { APIError } from 'lib/api/error';
import { getAuthUser, setAuthUser } from 'lib/api/db/users';
import { UserRole } from 'lib/models/user';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithBody, Validator } from 'lib/api/middleware/plugins/check-body';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { UserAuth } from 'lib/models/user';

export type SetPasswordData = {
    username: UserAuth['password'],
    currentPassword: UserAuth['password'];
    password: UserAuth['password'];
    passwordRepeat: UserAuth['password'];
};

type SetPasswordReq = NextReqWithAuth & NextReqWithBody<SetPasswordData>;
export type SetPasswordRes = void;

const validateBody: Validator<SetPasswordData> = ({
    username,
    currentPassword,
    password,
    passwordRepeat,
    ...rest
}) => (
    username !== undefined && typeof username === 'string' && /^[a-z.0-9_]{5,15}/.test(username)
    && currentPassword !== undefined && typeof currentPassword === 'string' && currentPassword.length >= 5 && currentPassword.length <= 30
    && password !== undefined && typeof password === 'string' && password.length >= 5 && password.length <= 30
    && passwordRepeat !== undefined && typeof passwordRepeat === 'string' && passwordRepeat.length >= 5 && passwordRepeat.length <= 30
    && passwordRepeat === password && Object.keys(rest).length === 0
);

const setPasswordAPI = async (req: SetPasswordReq, res: Res<SetPasswordRes>): Promise<void> => {
    try {
        const { body, auth } = req;
        const { username, password: newPassword, currentPassword } = body;

        // only self acc or admin
        if (username !== auth.username && auth.role !== UserRole.ADMIN) {
            throw new APIError('Not enough rights', 403);
        }
        const { password: currPassDB } = await getAuthUser(username);

        if (currPassDB !== sha1(currentPassword)) {
            throw new APIError('Incorrect credentials', 403);
        }
        const password = sha1(newPassword);

        if (currPassDB === password) {
            throw new APIError('Password matches with current', 403);
        }
        const userAuth: UserAuth = {
            username,
            password,
        };
        await setAuthUser(userAuth);

        res.status(204).end();
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    ipRateLimit,
    checkBody(validateBody),
    checkAuth(),
    setPasswordAPI,
);
