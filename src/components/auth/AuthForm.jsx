import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;

const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top: 1rem;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const AuthForm = ({ error, username, password, onChange, onSubmit }) => {
    return (
        <AuthFormBlock>
            <h3>Login</h3>
            <form onSubmit={onSubmit}>
                <StyledInput name="username" value={username} placeholder="Username" onChange={onChange} />
                <StyledInput name="password" value={password} type="Password" placeholder="Password" onChange={onChange} />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button cyan={true} fullWidth={true} style={{ marginTop: '1rem' }}>
                    LOGIN
                </Button>
            </form>
        </AuthFormBlock>
    );
};

export default AuthForm;
