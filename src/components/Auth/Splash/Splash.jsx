import React, { useEffect, useState } from 'react';
import * as S from './Splash.styled';

const FirstConnectLoading = () => {
    const text = 'Deskoration';
    const [isLoading, setIsLoading] = useState(true);
    const [toggleColor, setToggleColor] = useState(true);
    const lightColor = isLoading ? 'none' : '#efc265';

    useEffect(() => {
        setToggleColor(false);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2500);
    }, []);

    return (
        <S.LogoContainer>
            <S.LoadingImg style={{ '--light-color': lightColor }} />
            <S.TitleBox>
                {text.split('').map((char, index) => (
                    <S.CharSpan
                        key={index}
                        $toggleColor={toggleColor}
                        $delay={0.1 * index}
                    >
                        {char}
                    </S.CharSpan>
                ))}
            </S.TitleBox>
        </S.LogoContainer>
    );
};

export default FirstConnectLoading;
