import React from 'react';

import * as S from './GradientButton.styled';

const GradientButton = ({ children, type, gra, width, padding, onClick }) => {
    return (
        <S.GradientButton
            type={type}
            $gra={gra}
            width={width}
            $padding={padding}
            onClick={onClick}
        >
            {children}
        </S.GradientButton>
    );
};

export default GradientButton;
