import React, { useState } from 'react';

import * as S from './ConfirmModal.styled';

const ConfirmModal = () => {
    const [temp, setTemp] = useState(false);
    const onTemp = () => setTemp(!temp);

    return (
        <>
            <button onClick={onTemp}>modal</button>
            <S.Dialog open={temp}>
                <S.ConfirmModalContainer>
                    <S.ConfirmModalInnerContainer>
                        <S.ConfirmModalQustion>
                            관련된 물음
                        </S.ConfirmModalQustion>
                        <S.ConfirmModalButtonBox>
                            <button type="button">yes</button>
                            <button type="button">no</button>
                        </S.ConfirmModalButtonBox>

                        <S.CloseConfirmModalButton
                            type="button"
                            onClick={onTemp}
                        >
                            X아이콘
                        </S.CloseConfirmModalButton>
                    </S.ConfirmModalInnerContainer>
                </S.ConfirmModalContainer>
            </S.Dialog>
        </>
    );
};

export default ConfirmModal;
