import AuthForm from '../../components/auth/AuthForm';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput, initializeForm, login } from '../../modules/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { check } from '../../modules/user';

const LoginForm = () => {
    const [error, setError] = useState(null);

    const { username, password, auth, authError, user } = useSelector(({ auth, user }) => ({
        username: auth.username,
        password: auth.password,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(changeInput({ key: name, value: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if ([username, password].includes('')) {
            setError('Insert Username or Password');
            return;
        }
        dispatch(login({ username, password }));
    };

    useEffect(() => {
        dispatch(initializeForm());
    }, [dispatch]);

    useEffect(() => {
        if (authError) {
            if (!authError.response) {
                setError('Internet Connection Failed');
                return;
            }

            if (authError.response.status === 401) {
                setError('Authentication Failed');
            } else if (authError.response.status === 500) {
                setError('Login Failed');
            }
            return;
        }

        if (auth) {
            dispatch(check());
        }
    }, [auth, authError, dispatch, navigate]);

    useEffect(() => {
        if (user) {
            navigate('/home', { replace: true });
        }
    }, [user, navigate]);

    return (
        <div>
            <AuthForm error={error} username={username} password={password} onChange={onChange} onSubmit={onSubmit} />
        </div>
    );
};

export default LoginForm;
