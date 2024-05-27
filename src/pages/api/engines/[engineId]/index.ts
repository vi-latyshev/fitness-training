import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { allowMethods } from '@/lib/api/middleware/plugins/allow-methods';
import { fetchEnginesAPI } from '@/lib/api/routes/engines/fetch';
import { removeEnginesAPI } from '@/lib/api/routes/engines/remove';

import type {
    FetchEngineReq, FetchEngineRes,
} from '@/lib/api/routes/engines/fetch';
import type { NextApiResponse } from 'next';
import type { RemoveEngineRes, RemoveEngineReq } from '@/lib/api/routes/engines/remove';

const engine = async (
    req: FetchEngineReq | RemoveEngineReq,
    res: NextApiResponse<FetchEngineRes | RemoveEngineRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await fetchEnginesAPI(req, res);
            break;
        case 'DELETE':
            await removeEnginesAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET', 'DELETE']),
    engine,
);
