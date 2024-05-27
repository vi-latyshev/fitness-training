import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { checkBody } from '@/lib/api/middleware/plugins/check-body';
import { checkExistsEngine } from '@/lib/api/db/engine';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { UserRole } from '@/lib/models/user';
import { APIError } from '@/lib/api/error';
import {
    bearingFaultReasonList,
    fanFaultReasonList,
    rotorFaultReasonList,
    statorFaultReasonList,
    wildingRotorFaultReasonList,
} from '@/lib/models/maintenance';
import { createMaintenance } from '@/lib/api/db/maintenance';

import type { Maintenance, MaintenanceCreateData, MaintenanceCreateDBData } from '@/lib/models/maintenance';
import type { NextApiResponse as Res } from 'next';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';
import type { Validator, NextReqWithBody } from '@/lib/api/middleware/plugins/check-body';

export type CreateMaintenanceReq = Omit<NextReqWithAuth, 'body'> & NextReqWithBody<MaintenanceCreateData>;
export type CreateMaintenanceRes = Maintenance;

const validateBody: Validator<MaintenanceCreateData> = ({
    engineId,
    rotor,
    rotorDescription,

    wildingRotor,
    wildingRotorDescription,

    stator,
    statorDescription,

    bearing,
    bearingDescription,

    fan,
    fanDescription,

    carriedOutDescription,
    ...rest
}) => (
    engineId !== undefined && typeof engineId === 'string'

    && rotor !== undefined && rotorFaultReasonList.includes(rotor)
    && rotorDescription !== undefined && typeof rotorDescription === 'string'

    && wildingRotor !== undefined && wildingRotorFaultReasonList.includes(wildingRotor)
    && wildingRotorDescription !== undefined && typeof wildingRotorDescription === 'string'

    && stator !== undefined && statorFaultReasonList.includes(stator)
    && statorDescription !== undefined && typeof statorDescription === 'string'

    && bearing !== undefined && bearingFaultReasonList.includes(bearing)
    && bearingDescription !== undefined && typeof bearingDescription === 'string'

    && fan !== undefined && fanFaultReasonList.includes(fan)
    && fanDescription !== undefined && typeof fanDescription === 'string'

    && carriedOutDescription !== undefined && typeof carriedOutDescription === 'string'
    && Object.keys(rest).length === 0
);

const createMaintenanceAPIHandler = async (
    req: CreateMaintenanceReq,
    res: Res<CreateMaintenanceRes>
): Promise<void> => {
    try {
        const { auth, body } = req;

        // can create task only reporter
        if (auth.role !== UserRole.MASTER) {
            throw new APIError('Not enough rights', 403);
        }
        await checkExistsEngine(body.engineId);

        const maintenanceData: MaintenanceCreateDBData = {
            ...body,
            autor: auth.username,
            createdAt: Date.now(),
        };

        const maintenance = await createMaintenance(maintenanceData);

        res.status(200).json(maintenance);
    } catch (e) {
        handleApiError(e, res);
    }
};

export const createMaintenanceAPI = withMiddleware(
    authRateLimit(checkAuth(true)),
    checkBody(validateBody),
    createMaintenanceAPIHandler,
);
