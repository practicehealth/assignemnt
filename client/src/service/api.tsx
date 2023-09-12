import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_NOTIFICATION_MESSAGES, service_URLS } from '../constant/config';

const Back_URL = "http://localhost:5000";

const axiosInstance = axios.create({
    baseURL: Back_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

// Define a type for the response data structure
interface ResponseData {
    isSuccess?: boolean;
    isFailure?: boolean;
    status?: number;
    msg?: string;
    code?: number;
    data?: any;
}

// Define a type for the error data structure
interface ErrorResponse {
    isError: boolean;
    msg: string;
    code: number | string;
}


// Process response function
const processResponse = (response: AxiosResponse): ResponseData => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.data?.msg,
            code: response?.data?.code
        };
    }
};

// Process error function

// Define an object to store API functions
const API: Record<string, (body?: any) => Promise<ResponseData | ErrorResponse>> = {};

for (const [key, value] of Object.entries(service_URLS)) {
    API[key] = (body?: any) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: 'json', 
           
        });
}

// Define GetAccessToken() function if it's not already defined

export { API };
