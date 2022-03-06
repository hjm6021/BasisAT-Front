import AuthForm from '../../components/auth/AuthForm';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput, initializeForm, login } from '../../modules/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const LoginForm = () => {
    const [error, setError] = useState(null);

    const { username, password, auth, authError } = useSelector(({ auth }) => ({
        username: auth.username,
        password: auth.password,
        auth: auth.auth,
        authError: auth.authError,
    }));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(changeInput({ key: name, value: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
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

            if (authError.response.status === 400) {
                setError('Insert Username or Password');
            } else if (authError.response.status === 401) {
                setError('Authentication Failed');
            } else if (authError.response.status === 500) {
                setError('Login Failed');
            }
            return;
        }

        if (auth) {
            navigate('/');
            try {
                console.log(JSON.stringify(auth));
                sessionStorage.setItem('user', JSON.stringify(auth));
            } catch (e) {
                console.log('sessionStorage is not working');
            }
        }
    }, [auth, authError, dispatch, navigate]);

    return (
        <div>
            <AuthForm error={error} username={username} password={password} onChange={onChange} onSubmit={onSubmit} />
        </div>
    );
};

export default LoginForm;
