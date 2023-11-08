import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlertModal } from '../../features/modal/alertModalSlice';
import GradientButton from '../GradientButton/GradientButton';

import * as S from './AlertModal.styled';

const AlertModal = ({ alert }) => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector(store => store.alertModal);

    return (
        <S.Dialog open={isOpen}>
            <S.AlertModalContainer>
                <S.AlertModalInnerContainer>
                    <S.AlertText>{alert}</S.AlertText>
                    <S.AlertmModalButtonBox>
                        <GradientButton
                            gra="true"
                            width="90%"
                            padding="20px"
                            onClick={() => dispatch(closeAlertModal())}
                        >
                            확인
                        </GradientButton>
                    </S.AlertmModalButtonBox>
                </S.AlertModalInnerContainer>
            </S.AlertModalContainer>
        </S.Dialog>
    );
};

export default AlertModal;
