import axios from 'axios';

const jsonRequest = axios.create({
    baseURL: '/api', // ָ��API�Ļ���URL
    timeout: 5000, // ��������ʱʱ�䣨���룩
    headers: {
        'Content-Type': 'application/json',
    },
});

const fileRequest = axios.create({
    baseURL: '/api', // ָ��API�Ļ���URL
    timeout: 5000, // ��������ʱʱ�䣨���룩
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export {jsonRequest, fileRequest};