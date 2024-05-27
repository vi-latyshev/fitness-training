import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { checkBody } from '@/lib/api/middleware/plugins/check-body';
import { checkExistsEngineByHumanId, createEngine } from '@/lib/api/db/engine';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { UserRole } from '@/lib/models/user';
import { APIError } from '@/lib/api/error';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';
import type { Validator, NextReqWithBody } from '@/lib/api/middleware/plugins/check-body';
import type { Engine, EngineCreateData, EngineCreateDBData } from '@/lib/models/engine';

export type CreateEngineReq = Omit<NextReqWithAuth, 'body'> & NextReqWithBody<EngineCreateData>;
export type CreateEngineRes = Engine;

/**
 * hard code for validation
 *
 * - no additional fields
 */
const validateBody: Validator<EngineCreateData> = ({
    humanId,
    maxSpeedPm,
    power,
    nominalVoltage,
    nominalCurrent,
    weight,
    ...rest
}) => (
    humanId !== undefined && typeof humanId === 'string' && /^[a-z.0-9_]{3,15}/.test(humanId)
    && maxSpeedPm !== undefined && typeof maxSpeedPm === 'number'
    && power !== undefined && typeof power === 'number'
    && nominalVoltage !== undefined && typeof nominalVoltage === 'number'
    && nominalCurrent !== undefined && typeof nominalCurrent === 'number'
    && weight !== undefined && typeof weight === 'number'
    && Object.keys(rest).length === 0
);

const createEngineAPIHandler = async (req: CreateEngineReq, res: Res<CreateEngineRes>): Promise<void> => {
    try {
        const { auth, body } = req;

        // can create task only reporter
        if (auth.role !== UserRole.MASTER) {
            throw new APIError('Not enough rights', 403);
        }
        await checkExistsEngineByHumanId(body.humanId);

        const engineData: EngineCreateDBData = {
            ...body,
            createdAt: Date.now(),
        };

        const engine = await createEngine(engineData);

        res.status(200).json(engine);
    } catch (e) {
        handleApiError(e, res);
    }
};

export const createEngineAPI = withMiddleware(
    authRateLimit(checkAuth(true)),
    checkBody(validateBody),
    createEngineAPIHandler,
);
