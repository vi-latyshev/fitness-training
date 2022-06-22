import { useCallback } from 'react';

import { WorkoutsStatus } from 'lib/models/workout';

import { Button } from 'components/controls';

interface ListTabsProps {
    filter: WorkoutsStatus | null;
    handleChange: (status: WorkoutsStatus | null) => void;
}

export const ListTabs = ({ filter, handleChange }: ListTabsProps) => {
    const handleChangeTab = useCallback((status: WorkoutsStatus | null) => () => {
        handleChange(status);
    }, []);

    return (
        <div className="flex flex-row mx-5 space-x-6">
            <div className="flex items-center space-x-4 grow">
                <Button
                    variant={filter === null ? 'soft' : 'text'}
                    rounded
                    hover={false}
                    onClick={handleChangeTab(null)}
                >
                    Все
                </Button>
                <Button
                    variant={filter === WorkoutsStatus.UnDone ? 'soft' : 'text'}
                    rounded
                    onClick={handleChangeTab(WorkoutsStatus.UnDone)}
                >
                    Не сделано
                </Button>
                <Button
                    variant={filter === WorkoutsStatus.Done ? 'soft' : 'text'}
                    rounded
                    onClick={handleChangeTab(WorkoutsStatus.Done)}
                >
                    Завершенные
                </Button>
            </div>
        </div>
    );
};
