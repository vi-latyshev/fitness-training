import { SwrLoadingHandle } from '@/components/SwrLoadingHandle';
import Table from '@/components/Table';
import { useEngines } from '@/hooks/useEngines';

import { EngineRow } from './EngineRow';

export const EnginesList = (): React.ReactElement => {
    const engines = useEngines();

    const { items, isLoading, error } = engines;

    return (
        <Table.Container>
            <Table.Pagination {...engines} />
            <SwrLoadingHandle isLoading={isLoading} error={error}>
                <Table.Table>
                    <Table.Head>
                        <Table.Row disabled border={false}>
                            <Table.Cell>ID двигателя</Table.Cell>
                            <Table.Cell>Макс. скорость</Table.Cell>
                            <Table.Cell>Мощность</Table.Cell>
                            <Table.Cell>Напряжение</Table.Cell>
                            <Table.Cell>Ток</Table.Cell>
                            <Table.Cell>Вес</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {items.map((item) => (
                            <EngineRow key={item.id} engine={item} />
                        ))}
                    </Table.Body>
                </Table.Table>
            </SwrLoadingHandle>
        </Table.Container>
    );
};
