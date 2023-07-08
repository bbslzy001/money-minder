import axios from 'axios';

const request = axios.create({
    baseURL: '/api', // 指定API的基础URL
    timeout: 5000, // 设置请求超时时间（毫秒）
    headers: {
        'Content-Type': 'application/json',
    },
});

export default request;