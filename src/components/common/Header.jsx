import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import Responsive from './Responsive';

const HeaderBlock = styled.div`
    position: fixed;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;
const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
    }
    .right {
        display: flex;
        align-items: center;
    }
`;
const Spacer = styled.div`
    height: 4rem;
`;
const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
`;

const Header = ({ auth, onLogout }) => {
    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link to="/" className="logo">
                        BasisAT
                    </Link>
                    <Link to="/tools" className="logo">
                        TOOLS
                    </Link>
                    <Link to="/settings" className="logo">
                        SETTINGS
                    </Link>
                    <div className="right">
                        <UserInfo>
                            {auth.username} ({auth.isAdmin ? 'ADMIN' : 'USER'})
                        </UserInfo>
                        <Button onClick={onLogout}>Logout</Button>
                    </div>
                </Wrapper>
            </HeaderBlock>
            <Spacer />
        </>
    );
};

export default Header;
