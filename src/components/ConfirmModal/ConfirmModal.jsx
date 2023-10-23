import React from 'react';

import * as S from './ConfirmModal.styled';

const ConfirmModal = () => {
    return (
        <S.Dialog>
            <S.ConfirmModalContainer>
                <S.ConfirmModalQustion>관련된 물음</S.ConfirmModalQustion>
                <S.ConfirmModalButtonBox>
                    <button type="button">yes</button>
                    <button type="button">no</button>
                </S.ConfirmModalButtonBox>

                <S.CloseConfirmModalButton type="button">
                    close
                </S.CloseConfirmModalButton>
            </S.ConfirmModalContainer>
        </S.Dialog>
    );
};

export default ConfirmModal;
