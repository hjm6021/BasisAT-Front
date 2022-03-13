import HeaderContainer from '../containers/common/HeaderContainer';
import Loading from '../components/common/Loading';
import { useSelector } from 'react-redux';
import HomeContainer from '../containers/home/HomeContainer';

const HomePage = () => {
    const { loading } = useSelector(({ loading }) => ({
        loading: loading['user/CHECK'],
    }));

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <HeaderContainer />
                    <HomeContainer />
                </>
            )}
        </div>
    );
};

export default HomePage;
