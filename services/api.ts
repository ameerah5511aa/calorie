import axios from 'axios';

// Replace with your actual backend IP address
// For Android emulator use 10.0.2.2, for iOS simulator use localhost
// For physical device use your computer's local IP (e.g., 192.168.1.36)
const BASE_URL = 'http://192.168.1.36:5000/api'; // CHANGE THIS

export const api = {
    get: (url: string) => axios.get(`${BASE_URL}${url}`),
    post: (url: string, data: any) => axios.post(`${BASE_URL}${url}`, data),
};
