import axios from 'axios';

import { APIError, APIErrorJSON } from 'lib/api/error';

import type { AxiosResponse } from 'axios';

export const fetcher = async <T>(url: string): Promise<T> => {
    try {
        const res = await axios.get<T>(url);

        return (res as AxiosResponse<T>).data;
    } catch (err) {
        if (!axios.isAxiosError(err)) {
            throw new APIError(`API (${url}) Unexpected error: ${err}`);
        }
        if (err.response) {
            const { data, status } = err.response as AxiosResponse<APIErrorJSON>;
            const { message, errors } = data ?? {};

            throw new APIError(`API (${url}) responded with error: ${message}`, status, errors);
        }
        if (err.request) {
            throw new APIError(`API (${url}) did not respond.`);
        }
        throw new APIError(`${err.name} calling API (${url}): ${err.message}`);
    }
};
