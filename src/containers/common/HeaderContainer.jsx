import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { removeCookies } from '../../lib/cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeAuth } from '../../modules/auth';

const HeaderContainer = () => {
    const { user, auth } = useSelector(({ user, auth }) => ({ user: user.user, auth: auth.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, auth, navigate]);

    const onLogout = () => {
        dispatch(logout());
        dispatch(initializeAuth());
        removeCookies('access-token');
    };

    return <div>{!user ? null : <Header user={user} onLogout={onLogout} />}</div>;
};

export default HeaderContainer;
