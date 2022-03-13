import styled from 'styled-components';
import Responsive from '../common/Responsive';
import MDEditor from '@uiw/react-md-editor';
import ActionButtons from '../../containers/home/ActionButtons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { edit_homeInfo } from '../../lib/api/home';

const HomeEditBlock = styled(Responsive)`
    margin-top: 3rem;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const HomeEdit = ({ description }) => {
    const [editor, setEditor] = useState(description);
    const [error, setError] = useState(null);

    const { id } = useSelector(({ home }) => ({ id: home.id }));
    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1);
    };
    const onClickEdit = async () => {
        try {
            await edit_homeInfo({ id, editor });
            setError(null);
            navigate('/home');
        } catch (error) {
            if (!error.status) {
                setError('Internet Connection Failed');
            }
            if (error.response.status === 401) {
                setError('Authentication Failed');
            } else if (error.response.status === 403) {
                setError('No Permission');
            }
        }
    };
    return (
        <HomeEditBlock>
            <MDEditor height={700} value={editor} onChange={setEditor} />
            <ActionButtons onClickBack={onClickBack} onClickEdit={onClickEdit} />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </HomeEditBlock>
    );
};

export default HomeEdit;
