import axios from 'axios';

const request = axios.create({
    baseURL: '/api', // ָ��API�Ļ���URL
    timeout: 5000, // ��������ʱʱ�䣨���룩
    headers: {
        'Content-Type': 'application/json',
    },
});

export default request;