import client from './client';

// withCredentials: True for Cookies
export const get_homeInfo = () => {
    return client.get('/home', { withCredentials: true });
};

// withCredentials: True for Cookies
export const edit_homeInfo = ({ id, editor }) => {
    return client.put('/home', { id, editor }, { withCredentials: true });
};
