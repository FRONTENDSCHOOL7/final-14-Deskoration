import React from 'react';

import * as S from './GradientButton.styled';

const GradientButton = ({ children, gra, width }) => {
    return (
        <S.GradientButton type="button" $gra={gra} width={width}>
            {children}
        </S.GradientButton>
    );
};

export default GradientButton;
