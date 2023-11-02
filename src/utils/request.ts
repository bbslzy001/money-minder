import axios from 'axios';

const jsonRequest = axios.create({
    baseURL: '/api', // 指定API的基础URL
    timeout: 5000, // 设置请求超时时间（毫秒）
    headers: {
        'Content-Type': 'application/json',
    },
});

const fileRequest = axios.create({
    baseURL: '/api', // 指定API的基础URL
    timeout: 10000, // 设置请求超时时间（毫秒）
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export {jsonRequest, fileRequest};