import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookies = (name, value, option) => {
    return cookies.set(name, value, { ...option });
};

export const getCookies = (name) => {
    return cookies.get(name);
};

export const removeCookies = (name, option) => {
    return cookies.remove(name, { ...option });
};
