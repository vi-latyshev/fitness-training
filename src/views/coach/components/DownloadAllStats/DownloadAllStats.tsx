import { useCallback, useState } from 'react';
import axios from 'axios';

import Card from 'components/Card';
import { Modal } from 'components/Modal';
import { Button } from 'components/controls';

import { LoaderIcon } from 'icons/Loader';

import { downloadAllStatsCSV } from './download';

import type { APIErrorJSON } from 'lib/api/error';

export const DownloadAllStats = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const handleDownload = useCallback(async () => {
        setIsLoading(true);
        try {
            const csvContent = await downloadAllStatsCSV();

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');

            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'users_stats.csv');
            document.body.appendChild(link);

            link.click();
            link.remove();

            setServerError(null);
        } catch (error) {
            try {
                if (!axios.isAxiosError(error)) {
                    throw Error(`Unexpected error: ${error}`);
                }
                const { message: respMsg } = error.response?.data as APIErrorJSON;

                setServerError(respMsg);
            } catch (err) {
                throw new Error(`Handling response error: ${err}`);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleLoadingClose = useCallback(() => {
        if (!serverError) {
            return;
        }
        setIsLoading(false);
    }, [serverError]);

    return (
        <>
            <Modal open={isLoading} onClose={handleLoadingClose}>
                <Card.Card>
                    <Card.Title center>Выгрузка статистики</Card.Title>
                    {serverError && <p className="text-error text-sm">{serverError}</p>}
                    {!serverError && (
                        <div className="flex flex-col items-center relative space-y-6">
                            <div>Выполняется выгрузка данных...</div>
                            <LoaderIcon className="h-10 w-10" />
                        </div>
                    )}
                </Card.Card>
            </Modal>
            <Button
                onClick={handleDownload}
                disabled={isLoading}
                Icon={(isLoading
                    ? <LoaderIcon className="text-white" />
                    : undefined
                )}
                className="self-end"
            >
                Выгрузить статистику (.csv)
            </Button>
        </>
    );
};
