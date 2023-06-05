// import { APIError } from '@/lib/api/error';
// import { handleApiError } from '@/lib/api/error/handle-api-error';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { checkBody } from '@/lib/api/middleware/plugins/check-body';
import { withMiddleware } from '@/lib/api/middleware/with-middlewares';

import type { NextReqWithBody, Validator } from '@/lib/api/middleware/plugins/check-body';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';
import type { UserUpdateData } from '@/lib/models/user';

// import type { NextApiResponse as Res } from 'next';

export type UpdateUserReq = NextReqWithAuth & NextReqWithBody<UserUpdateData>;
// type UpdateUserRes = void;

const validateBody: Validator<UserUpdateData> = ({
    firstName,
    lastName,
    // avatartSrc,
    ...rest
}) => (
    (firstName === undefined || (typeof firstName === 'string' && firstName.length >= 1 && firstName.length <= 50))
    && (firstName === undefined || (typeof lastName === 'string' && lastName.length >= 1 && lastName.length <= 50))
    // && ()
    && Object.keys(rest).length === 0
);

// const updateUserAPI = async (req: UpdateUserReq, res: Res<UpdateUserRes>): Promise<void> => {
//     try {
//         const { body, auth } = req;
//         const { username, password: newPassword, currentPassword } = body;

//         // only self acc or admin
//         if (username !== auth.username) {
//             throw new APIError('Not enough rights', 403);
//         }

//         res.status(204).end();
//     } catch (e) {
//         handleApiError(e, res);
//     }
// };

export default withMiddleware(
    authRateLimit(checkAuth()),
    checkBody(validateBody),
    // updateUserAPI,
);
