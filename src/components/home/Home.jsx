import MDEditor from '@uiw/react-md-editor';
import Responsive from '../common/Responsive';
import styled from 'styled-components';
import Button from '../common/Button';

const HomeInfoBlock = styled(Responsive)`
    margin-top: 3rem;
`;

const ButtonBlock = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
    margin-top: -1.5rem;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 1rem;
    margin-top: 1rem;
    font-weight: 500;
`;

const Home = ({ auth, homeInfo, homeInfoError }) => {
    return (
        <HomeInfoBlock>
            {homeInfoError && <ErrorMessage>{homeInfoError.message}</ErrorMessage>}
            <ButtonBlock>
                {auth && auth.isAdmin ? (
                    <Button cyan to="/home/edit">
                        Edit
                    </Button>
                ) : null}
            </ButtonBlock>
            {homeInfo ? <MDEditor.Markdown source={homeInfo.description} /> : null}
        </HomeInfoBlock>
    );
};

export default Home;
