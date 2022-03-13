import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import AskModal from '../../components/common/AskModals';
import { useState } from 'react';

const ActionButtonsBlock = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    margin-top: 1rem;
`;
const ActionButton = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 4px;
    color: ${palette.gray[6]};
    font-weight: bold;
    border: none;
    outline: none;
    font-size: 1.25rem;
    cursor: pointer;
    &:hover {
        background: ${palette.gray[1]};
        color: ${palette.cyan[7]};
    }
    & + & {
        margin-left: 3rem;
    }
`;

const ActionButtons = ({ onClickEdit, onClickBack }) => {
    const [modal, setModal] = useState(false);
    const onClickConfirm = () => {
        setModal(true);
    };
    const onCancel = () => {
        setModal(false);
    };
    const onConfirm = () => {
        setModal(false);
        onClickEdit();
    };
    return (
        <>
            <ActionButtonsBlock>
                <ActionButton onClick={onClickBack}>BACK</ActionButton>
                <ActionButton onClick={onClickConfirm}>EDIT</ActionButton>
            </ActionButtonsBlock>
            <AskModal visible={modal} title="Edit - Home" description="Are you sure to edit Home?" onCancel={onCancel} onConfirm={onConfirm} />
        </>
    );
};

export default ActionButtons;
