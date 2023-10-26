import React from 'react';

import * as S from './GradientButton.styled';

const GradientButton = ({ children, gra, width, padding, onClick }) => {
    return (
        <S.GradientButton
            type="button"
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
