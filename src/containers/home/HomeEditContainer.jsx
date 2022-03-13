import { useSelector } from 'react-redux';
import HomeEdit from '../../components/home/HomeEdit';

const HomeEditContainer = () => {
    const { description } = useSelector(({ home }) => ({
        description: home.description,
    }));

    return (
        <>
            <HomeEdit description={description} />
        </>
    );
};

export default HomeEditContainer;
