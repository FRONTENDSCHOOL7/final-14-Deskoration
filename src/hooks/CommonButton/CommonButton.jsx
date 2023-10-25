import React from 'react';

import * as S from './CommonButton.styled';

const CommonButton = ({ children, gra, width }) => {
    return (
        <S.CommonButton type="button" $gra={gra} width={width}>
            {children}
        </S.CommonButton>
    );
};

export default CommonButton;
