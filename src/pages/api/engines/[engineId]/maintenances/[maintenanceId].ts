import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { allowMethods } from '@/lib/api/middleware/plugins/allow-methods';
import { fetchMaintenanceAPI } from '@/lib/api/routes/maintenances/fetch';

import type { FetchMaintenanceReq, FetchMaintenanceRes } from '@/lib/api/routes/maintenances/fetch';
import type { NextApiResponse } from 'next';

const maintenance = async (
    req: FetchMaintenanceReq,
    res: NextApiResponse<FetchMaintenanceRes>
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await fetchMaintenanceAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET']),
    maintenance,
);
