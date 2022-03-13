import client from './client';

// withCredentials: True for Cookies
export const get_homeInfo = () => {
    return client.get('/home', { withCredentials: true });
};
