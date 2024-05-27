import { allowMethods } from '@/lib/api/middleware/plugins/allow-methods';
import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { createEngineAPI } from '@/lib/api/routes/engines/create';
import { listEnginesAPI } from '@/lib/api/routes/engines/list';

import type { NextApiResponse } from 'next';
import type { CreateEngineReq, CreateEngineRes } from '@/lib/api/routes/engines/create';
import type { EngineListReq, EnginesListRes } from '@/lib/api/routes/engines/list';

const engines = async (
    req: CreateEngineReq | EngineListReq,
    res: NextApiResponse<CreateEngineRes | EnginesListRes>
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await listEnginesAPI(req, res);
            break;
        case 'POST':
            await createEngineAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET', 'POST']),
    engines,
);
