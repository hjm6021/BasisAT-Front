import HeaderContainer from '../containers/common/HeaderContainer';
import Loading from '../components/common/Loading';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const { loading } = useSelector(({ loading }) => ({
        loading: loading['user/CHECK'],
    }));
    return <div>{loading ? <Loading /> : <HeaderContainer />}</div>;
};

export default HomePage;
