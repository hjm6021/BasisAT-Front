import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { removeCookies } from '../../lib/cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const onLogout = () => {
        dispatch(logout());
        try {
            removeCookies('access-token');
            sessionStorage.removeItem('user');
        } catch (e) {
            console.log(e);
        }
    };

    return <div>{!user ? null : <Header user={user} onLogout={onLogout} />}</div>;
};

export default HeaderContainer;
