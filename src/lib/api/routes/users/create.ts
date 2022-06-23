import sha1 from 'sha1';

import { createUser } from 'lib/api/db/users';
import { APIError } from 'lib/api/error';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { User, UserAuthData, UserRole } from 'lib/models/user';

import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

interface CreateUserReqBody extends UserAuthData { }

export type CreateUserRes = User;

/**
 * hard code for validation
 *
 * - username:
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
const checkIsInvalidReqBody = ({
    auth: {
        username,
        password,
    },
    meta: {
        role = UserRole.TRAINEE,
        height,
        weight,
        ...metaRest
    },
    ...rest
}: CreateUserReqBody): boolean => (
    username === undefined || typeof username !== 'string' || username.length >= 50
    || password === undefined || typeof password !== 'string' || password.length < 3 || password.length > 15
    || !(role in UserRole)
    || height === undefined || height < 0 || height > 400
    || weight === undefined || weight < 0 || weight > 400
    || Object.keys(rest).length >= 0 || Object.keys(metaRest).length >= 0
);

export const createUserAPI = async (req: Req, res: Res<CreateUserRes>) => {
    try {
        const body = req.body as CreateUserReqBody;

        if (typeof body !== 'object' || !checkIsInvalidReqBody(body)) {
            throw new APIError('Invalid request body', 400);
        }
        // pass to hash
        body.auth.password = sha1(body.auth.password);

        const user = await createUser(body);

        res.status(200).json(user);
    } catch (e) {
        handleApiError(e, res);
    }
};
