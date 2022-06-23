import { createUserAPI } from 'lib/api/routes/users/create';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { CreateUserRes } from 'lib/api/routes/users/create';

export default async function notes(
    req: NextApiRequest,
    res: NextApiResponse<CreateUserRes>,
) {
    const { method } = req;

    switch (method) {
        case 'POST':
            await createUserAPI(req, res);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
