import AuthForm from '../../components/auth/AuthForm';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput, initializeForm, login } from '../../modules/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const LoginForm = () => {
    const [error, setError] = useState(null);

    const { username, password, auth, authError, checkError } = useSelector(({ auth }) => ({
        username: auth.username,
        password: auth.password,
        auth: auth.auth,
        authError: auth.authError,
        checkError: auth.checkError,
    }));

    const navigate = useNavigate();
    const dispatch = useDispatch();

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

        if (checkError) {
            if (!checkError.response) {
                setError('Internet Connection Failed');
                return;
            }

            if (checkError.response.status === 401) {
                setError(null);
                return;
            }
        }

        if (auth) {
            navigate('/home');
        }
    }, [auth, authError, checkError, navigate]);

    return (
        <div>
            <AuthForm error={error} username={username} password={password} onChange={onChange} onSubmit={onSubmit} />
        </div>
    );
};

export default LoginForm;
