import { getMaintenance } from '@/lib/api/db/maintenance';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { verifyQueryId } from '@/lib/api/middleware/plugins/check-query-id';
import { withMiddleware } from '@/lib/api/middleware/with-middlewares';

import type { EngineId } from '@/lib/models/engine';
import type { Maintenance, MaintenanceID } from '@/lib/models/maintenance';
import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from '@/lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';

export type FetchMaintenanceReq = NextReqWithAuth & NextReqWithQueryIds<['engineId', 'maintenanceId']>;
export type FetchMaintenanceRes = Maintenance;

const fetchMaintenanceAPIHandler = async (req: FetchMaintenanceReq, res: Res<FetchMaintenanceRes>): Promise<void> => {
    try {
        const { query } = req;
        const { engineId, maintenanceId } = query;

        const maintenance = await getMaintenance(
            engineId as EngineId,
            maintenanceId as MaintenanceID
        );

        res.status(200).json(maintenance);
    } catch (error) {
        handleApiError(error, res);
    }
};

export const fetchMaintenanceAPI = withMiddleware(
    verifyQueryId<['maintenanceId']>(['maintenanceId']),
    authRateLimit(checkAuth()),
    fetchMaintenanceAPIHandler,
);
