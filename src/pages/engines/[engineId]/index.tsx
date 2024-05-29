import { useRouter } from 'next/router';

import { SwrLoadingHandle } from '@/components/SwrLoadingHandle';
import { MetaTitle } from '@/components/MetaTitle';
import { UserRole } from '@/lib/models/user';
import { EnginesBaseLayout, EngineStats } from '@/views/engines';
import { useEngine } from '@/hooks/useEngine';
import Dashboard from '@/components/Dashboard';
import Card from '@/components/Card';
import { MaintenanceAdd, MaintenanceMore, MaintanceList } from '@/views/maintenances';

import type { EngineId } from '@/lib/models/engine';
import type { NextPageWithLayout } from '@/views/base';

const EnginePick: NextPageWithLayout = () => {
    const router = useRouter();
    const { query } = router;

    const { engine, isLoading, error } = useEngine(query.engineId as EngineId);

    return (
        <SwrLoadingHandle isLoading={isLoading} error={error}>
            <MetaTitle title={`Двигатель ${engine.humanId}`} />
            <Dashboard.Title>
                Двигатель
                {' '}
                {engine.humanId}
            </Dashboard.Title>
            <Card.Container className="grid-cols-3">
                <Card.Card className="col-span-2">
                    <Card.Title>Статистика</Card.Title>
                    <EngineStats engineId={engine.id} />
                </Card.Card>
                <Card.Card>
                    <Card.Title>Сводка</Card.Title>
                </Card.Card>
            </Card.Container>
            <Card.Container>
                <Card.Card className="bg-grayPrimary">
                    <Card.Title large center>Последние ТО</Card.Title>
                    <MaintanceList engineId={engine.id} limit={1} pagination={false} />
                    <MaintenanceMore engineId={engine.id} />
                    <MaintenanceAdd engineId={engine.id} />
                </Card.Card>
            </Card.Container>
        </SwrLoadingHandle>
    );
};

EnginePick.layoutProps = {
    auth: {
        needRole: UserRole.MASTER,
    },
    Layout: EnginesBaseLayout,
};

export default EnginePick;
