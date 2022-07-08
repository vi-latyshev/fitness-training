import { useCallback } from 'react';

import { Button } from 'components/controls';

interface ListTabsProps {
    filter: boolean;
    handleChange: (status: boolean) => void;
}

export const ListTabs = ({ filter, handleChange }: ListTabsProps) => {
    const handleChangeTab = useCallback((status: boolean) => () => {
        handleChange(status);
    }, []);

    return (
        <div className="flex flex-row mx-5 space-x-6">
            <div className="flex items-center space-x-4 grow">
                <Button
                    variant={filter === null ? 'soft' : 'text'}
                    rounded
                    hover={false}
                    onClick={handleChangeTab(false)}
                >
                    Все
                </Button>
                <Button
                    variant={filter === true ? 'soft' : 'text'}
                    rounded
                    onClick={handleChangeTab(false)}
                >
                    Не сделано
                </Button>
                <Button
                    variant={filter === true ? 'soft' : 'text'}
                    rounded
                    onClick={handleChangeTab(true)}
                >
                    Завершенные
                </Button>
            </div>
        </div>
    );
};
