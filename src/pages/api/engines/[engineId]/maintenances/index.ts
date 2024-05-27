import { allowMethods } from '@/lib/api/middleware/plugins/allow-methods';
import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { createMaintenanceAPI } from '@/lib/api/routes/maintenances/create';
import { listMaintenancesAPI } from '@/lib/api/routes/maintenances/list';

import type { MaintenanceListReq, MaintenanceListRes } from '@/lib/api/routes/maintenances/list';
import type { CreateMaintenanceReq, CreateMaintenanceRes } from '@/lib/api/routes/maintenances/create';
import type { NextApiResponse } from 'next';

const maintenances = async (
    req: CreateMaintenanceReq | MaintenanceListReq,
    res: NextApiResponse<CreateMaintenanceRes | MaintenanceListRes>
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await listMaintenancesAPI(req, res);
            break;
        case 'POST':
            await createMaintenanceAPI(req, res);
            break;
        default:
            break;
    }
};

export default withMiddleware(
    allowMethods(['GET', 'POST']),
    maintenances,
);
