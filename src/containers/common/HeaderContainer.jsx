import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { initializeUser, logout } from '../../modules/user';
import { removeCookies } from '../../lib/cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeAuth } from '../../modules/auth';

const HeaderContainer = () => {
    const { user, checkError } = useSelector(({ user }) => ({ user: user.user, checkError: user.checkError }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || checkError) {
            navigate('/login');
        }
    }, [user, checkError, navigate]);

    const onLogout = () => {
        dispatch(logout());
        dispatch(initializeAuth());
        dispatch(initializeUser());
        removeCookies('access-token');
    };

    return <div>{!user ? null : <Header user={user} onLogout={onLogout} />}</div>;
};

export default HeaderContainer;
