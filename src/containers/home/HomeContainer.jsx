import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/common/Loading';
import Home from '../../components/home/Home';
import { getHome } from '../../modules/home';

const HomeContainer = () => {
    const dispatch = useDispatch();
    const { user, homeInfo, homeInfoError, loading } = useSelector(({ user, home, loading }) => ({
        user: user.user,
        homeInfo: home.homeInfo,
        homeInfoError: home.homeInfoError,
        loading: loading['home/GET_HOME'],
    }));

    useEffect(() => {
        dispatch(getHome());
    }, [dispatch]);

    return <>{loading ? <Loading /> : <Home user={user} homeInfo={homeInfo} homeInfoError={homeInfoError} />}</>;
};

export default HomeContainer;
