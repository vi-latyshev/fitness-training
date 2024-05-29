import clsx from 'clsx';
import dayjs from 'dayjs';

import Card from '@/components/Card';
import {
    BearingFaultReason,
    bearingFaultReasonHuman,
    FanFaultReason,
    fanFaultReasonHuman,
    RotorFaultReason,
    rotorFaultReasonHuman,
    ShaftFaultReason,
    shaftFaultReasonHuman,
    StatorFaultReason,
    statorFaultReasonHuman,
    WildingRotorFaultReason,
    wildingRotorFaultReasonHuman,
    WildingStatorFaultReason,
    wildingStatorFaultReasonHuman,
} from '@/lib/models/maintenance';
import { useEngine } from '@/hooks/useEngine';
import { SwrLoadingHandle } from '@/components/SwrLoadingHandle';
import { useUserByUsername } from '@/hooks/useUserByUsername';

import type { Maintenance } from '@/lib/models/maintenance';
import type { EngineId } from '@/lib/models/engine';

type MaintenanceItemProps = {
    engineId: EngineId;
    maintenance: Maintenance;
};

export const MaintenanceItem = ({ engineId, maintenance }: MaintenanceItemProps): React.ReactElement => {
    const { engine, isLoading: isLoadingEngine, error: errorEngine } = useEngine(engineId);
    const { user, isLoading: isLoadingUser, error: errorUser } = useUserByUsername(maintenance.autor);

    return (
        <Card.Card key={`${engineId}${maintenance.id}`}>
            <Card.Title center>Техническое обслуживание №{maintenance.id}</Card.Title>
            <div className="space-y-2">
                <div className="flex flex-row items-center space-x-4">
                    <div className="font-bold text-xl p-1">
                        Дата:
                    </div>
                    <div>
                        {dayjs(maintenance.createdAt).format('DD.MM.YYYY HH:mm')}
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-4">
                    <div className="font-bold text-xl p-1">
                        Двигатель:
                    </div>
                    <div>
                        <SwrLoadingHandle isLoading={isLoadingEngine} error={errorEngine}>
                            {engine.humanId}
                        </SwrLoadingHandle>
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-4">
                    <div className="font-bold text-xl p-1">
                        Обслуживание проводил:
                    </div>
                    <div>
                        <SwrLoadingHandle isLoading={isLoadingUser} error={errorUser}>
                            {user.firstName} {user.lastName}
                        </SwrLoadingHandle>
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-4 pt-5">
                    <div className={clsx('font-bold text-xl bg-successSoft p-1 rounded-lg', {
                        'bg-errorSoft': maintenance.rotor !== RotorFaultReason.None,
                    })}
                    >
                        Ротор:
                    </div>
                    <div>
                        {rotorFaultReasonHuman[maintenance.rotor] ?? '-'}.
                        {maintenance.rotor === RotorFaultReason.Other && (
                            <span>
                                {' '}{maintenance.rotorDescription}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-4">
                    <div className={clsx('font-bold text-xl bg-successSoft p-1 rounded-lg', {
                        'bg-errorSoft': maintenance.wildingRotor !== WildingRotorFaultReason.None,
                    })}
                    >
                        Обмотка ротора:
                    </div>
                    <div>
                        {wildingRotorFaultReasonHuman[maintenance.wildingRotor] ?? '-'}.
                        {maintenance.wildingRotor === WildingRotorFaultReason.Other && (
                            <span>
                                {' '}{maintenance.wildingRotorDescription}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-4">
                    <div className={clsx('font-bold text-xl bg-successSoft p-1 rounded-lg', {
                        'bg-errorSoft': maintenance.stator !== StatorFaultReason.None,
                    })}
                    >
                        Статор:
                    </div>
                    <div>
                        {statorFaultReasonHuman[maintenance.stator] ?? '-'}.
                        {maintenance.stator === StatorFaultReason.Other && (
                            <span>
                                {' '}{maintenance.statorDescription}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-4">
                    <div className={clsx('font-bold text-xl bg-successSoft p-1 rounded-lg', {
                        'bg-errorSoft': maintenance.wildingStator !== WildingStatorFaultReason.None,
                    })}
                    >
                        Обмотка статора:
                    </div>
                    <div>
                        {wildingStatorFaultReasonHuman[maintenance.wildingStator] ?? '-'}.
                        {maintenance.wildingStator === WildingStatorFaultReason.Other && (
                            <span>
                                {' '}{maintenance.wildingStatorDescription}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-4">
                    <div className={clsx('font-bold text-xl bg-successSoft p-1 rounded-lg', {
                        'bg-errorSoft': maintenance.bearing !== BearingFaultReason.None,
                    })}
                    >
                        Подшипник:
                    </div>
                    <div>
                        {bearingFaultReasonHuman[maintenance.bearing] ?? '-'}.
                        {maintenance.bearing === BearingFaultReason.Other && (
                            <span>
                                {' '}{maintenance.bearingDescription}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-4">
                    <div className={clsx('font-bold text-xl bg-successSoft p-1 rounded-lg', {
                        'bg-errorSoft': maintenance.fan !== FanFaultReason.None,
                    })}
                    >
                        Вентилятор:
                    </div>
                    <div>
                        {fanFaultReasonHuman[maintenance.fan] ?? '-'}.
                        {maintenance.fan === FanFaultReason.Other && (
                            <span>
                                {' '}{maintenance.fanDescription}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-4">
                    <div className={clsx('font-bold text-xl p-1 rounded-lg', {
                        'bg-successSoft': shaftFaultReasonHuman[maintenance.shaft] && maintenance.shaft === ShaftFaultReason.None,
                        'bg-errorSoft': shaftFaultReasonHuman[maintenance.shaft] && maintenance.shaft !== ShaftFaultReason.None,
                    })}
                    >
                        Вал:
                    </div>
                    <div>
                        {shaftFaultReasonHuman[maintenance.shaft] ?? '-'}.
                        {maintenance.shaft === ShaftFaultReason.Other && (
                            <span>
                                {' '}{maintenance.shaftDescription}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-4  pt-5">
                    <div className="font-bold text-xl p-1">
                        Проведенные мероприятия:
                    </div>
                    <div>
                        {maintenance.carriedOutDescription}
                    </div>
                </div>
            </div>
        </Card.Card>
    );
};
