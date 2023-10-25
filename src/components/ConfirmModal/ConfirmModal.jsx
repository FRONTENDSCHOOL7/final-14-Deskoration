import React, { useState } from 'react';
import GradientButton from '../GradientButton/GradientButton';

import * as S from './ConfirmModal.styled';

const ConfirmModal = ({ qustion }) => {
    const [temp, setTemp] = useState(false);
    const onTemp = () => setTemp(!temp);

    return (
        <>
            <button onClick={onTemp}>modal</button>
            <S.Dialog open={temp}>
                <S.ConfirmModalContainer>
                    <S.ConfirmModalInnerContainer>
                        <S.ConfirmModalQustion>{qustion}</S.ConfirmModalQustion>
                        <S.ConfirmModalButtonBox>
                            <GradientButton
                                gra="true"
                                width="40%"
                                padding="5px"
                            >
                                yes
                            </GradientButton>
                            <GradientButton width="40%">no</GradientButton>
                        </S.ConfirmModalButtonBox>

                        <S.CloseConfirmModalButton
                            type="button"
                            onClick={onTemp}
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
