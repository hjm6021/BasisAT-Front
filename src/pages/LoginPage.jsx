import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';
import { useSelector } from 'react-redux';
import Loading from '../components/common/Loading';

const LoginPage = () => {
    const { loading } = useSelector(({ loading }) => ({
        loading: loading['auth/CHECK'],
    }));
    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <AuthTemplate>
                    <LoginForm />
                </AuthTemplate>
            )}
        </div>
    );
};

export default LoginPage;
