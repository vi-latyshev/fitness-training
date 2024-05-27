import { memo, useCallback } from 'react';
import Router from 'next/router';
import { XIcon } from '@heroicons/react/outline';
import axios from 'axios';

import Table from '@/components/Table';
import { Button } from '@/components/controls';
import { useEngines } from '@/hooks/useEngines';

import type { Engine } from '@/lib/models/engine';
import type { RemoveEngineRes } from '@/lib/api/routes/engines/remove';

type EngineRowProps = {
    engine: Engine;
};

export const EngineRow = memo(({ engine }: EngineRowProps) => {
    const {
        id: engineId,
        humanId,
        maxSpeedPm,
        power,
        nominalCurrent,
        nominalVoltage,
        weight,
    } = engine;

    const { mutate } = useEngines();

    const handleEngineClick = useCallback(() => {
        Router.push(`/engines/${engineId}`);
    }, [engineId]);

    const handleRemoveTask = useCallback(async () => {
        try {
            await axios.delete<RemoveEngineRes>(`/api/engines/${engineId}`);
            await mutate();
        } catch (error) {
            try {
                if (!axios.isAxiosError(error)) {
                    throw Error(`Unexpected error: ${error}`);
                }
            } catch (err) {
                throw new Error(`Handling response error: ${err}`);
            }
        }
    }, [engineId, mutate]);

    return (
        <Table.Row>
            <Table.Cell full onClick={handleEngineClick} className="w-1/5 cursor-pointer">
                {humanId}
            </Table.Cell>
            <Table.Cell onClick={handleEngineClick} className="cursor-pointer">
                {maxSpeedPm}
            </Table.Cell>
            <Table.Cell onClick={handleEngineClick} className="cursor-pointer">
                {power}
            </Table.Cell>
            <Table.Cell onClick={handleEngineClick} className="cursor-pointer">
                {nominalVoltage}
            </Table.Cell>
            <Table.Cell onClick={handleEngineClick} className="cursor-pointer">
                {nominalCurrent}
            </Table.Cell>
            <Table.Cell onClick={handleEngineClick} className="cursor-pointer">
                {weight}
            </Table.Cell>
            <Table.Cell className="px-1">
                <Button
                    color="error"
                    variant="text"
                    Icon={<XIcon />}
                    className="px-5"
                    onClick={handleRemoveTask}
                />
            </Table.Cell>
        </Table.Row>
    );
});
