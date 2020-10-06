import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IRequestClient } from '@energyweb/origin-backend-core';
export declare class RequestClient implements IRequestClient {
    authenticationToken: string;
    get<T, U>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<U>>;
    post<T, U>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<U>>;
    put<T, U>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<U>>;
    delete<T, U>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<U>>;
    generateCancelToken(): import("axios").CancelTokenSource;
    private get config();
}
