import qs from 'qs';

import { getMaintenances } from '@/lib/api/db/maintenance';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { verifyQueryId } from '@/lib/api/middleware/plugins/check-query-id';

import type { NextReqWithQueryIds } from '@/lib/api/middleware/plugins/check-query-id';
import type { EngineId } from '@/lib/models/engine';
import type { NextApiResponse as Res } from 'next';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';
import type { Maintenance, MaintenanceListDBParams, MaintenanceListDBRes } from '@/lib/models/maintenance';
import type { Pagination } from '@/lib/api/redis/types';

export type MaintenanceListReq = NextReqWithAuth & NextReqWithQueryIds<['engineId']> & {
    query: MaintenanceListDBParams;
};

export type MaintenanceListRes = MaintenanceListDBRes;

const listMaintenancesAPIHandler = async (req: MaintenanceListReq, res: Res<MaintenanceListDBRes>): Promise<void> => {
    try {
        const queryData = qs.parse(req.query as Record<string, string>) as MaintenanceListReq['query'];

        const params: Pagination<Maintenance> = {
            ...queryData,
        };

        const engines = await getMaintenances(queryData.engineId as EngineId, params);

        res.status(200).json(engines);
    } catch (e) {
        handleApiError(e, res);
    }
};

export const listMaintenancesAPI = withMiddleware(
    verifyQueryId<['engineId']>(['engineId']),
    authRateLimit(checkAuth()),
    listMaintenancesAPIHandler,
);
