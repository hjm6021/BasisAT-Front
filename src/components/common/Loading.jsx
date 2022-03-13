import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';

const LoadingBlock = styled.div`
    height: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Loading = () => {
    return (
        <LoadingBlock>
            <Oval color="#00BFFF" height={150} width={150} />
        </LoadingBlock>
    );
};

export default Loading;
