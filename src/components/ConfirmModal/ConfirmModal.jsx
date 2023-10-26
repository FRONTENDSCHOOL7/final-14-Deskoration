import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeConfirmModal } from '../../features/modal/confirmModalSlice';
import GradientButton from '../GradientButton/GradientButton';

import * as S from './ConfirmModal.styled';

const ConfirmModal = ({ qustion, confirmClick }) => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector(store => store.confirmModal);

    return (
        <>
            <S.Dialog open={isOpen}>
                <S.ConfirmModalContainer>
                    <S.ConfirmModalInnerContainer>
                        <S.ConfirmModalQustion>{qustion}</S.ConfirmModalQustion>
                        <S.ConfirmModalButtonBox>
                            <GradientButton
                                gra="true"
                                width="40%"
                                padding="5px"
                                onClick={confirmClick}
                            >
                                yes
                            </GradientButton>
                            <GradientButton
                                width="40%"
                                onClick={() => dispatch(closeConfirmModal())}
                            >
                                no
                            </GradientButton>
                        </S.ConfirmModalButtonBox>

                        <S.CloseConfirmModalButton
                            type="button"
                            onClick={() => dispatch(closeConfirmModal())}
                        >
                            <S.CloseModalIcon />
                        </S.CloseConfirmModalButton>
                    </S.ConfirmModalInnerContainer>
                </S.ConfirmModalContainer>
            </S.Dialog>
        </>
    );
};

export default ConfirmModal;
