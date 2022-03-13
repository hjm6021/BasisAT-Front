import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/common/Loading';
import Home from '../../components/home/Home';
import { getHome } from '../../modules/home';

const HomeContainer = () => {
    const dispatch = useDispatch();
    const { auth, description, homeInfoError, loading } = useSelector(({ auth, home, loading }) => ({
        auth: auth.auth,
        description: home.description,
        homeInfoError: home.homeInfoError,
        loading: loading['home/GET_HOME'],
    }));

    useEffect(() => {
        dispatch(getHome());
    }, [dispatch]);

    return <>{loading ? <Loading /> : <Home auth={auth} description={description} homeInfoError={homeInfoError} />}</>;
};

export default HomeContainer;
