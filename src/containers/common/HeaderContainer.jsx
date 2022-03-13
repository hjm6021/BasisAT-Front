import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { removeCookies } from '../../lib/cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeAuth, logout } from '../../modules/auth';

const HeaderContainer = () => {
    const { auth, authError } = useSelector(({ auth }) => ({ auth: auth.auth, authError: auth.authError }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            navigate('/login', { replace: true });
        }
    }, [auth, authError, navigate]);

    const onLogout = () => {
        dispatch(logout());
        dispatch(initializeAuth());
        removeCookies('access-token');
    };

    return <div>{!auth ? null : <Header auth={auth} onLogout={onLogout} />}</div>;
};

export default HeaderContainer;
