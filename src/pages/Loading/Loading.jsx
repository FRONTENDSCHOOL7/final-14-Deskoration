import React, { useEffect, useState } from 'react';
import * as S from './Loading.styled';

const Loading = ({ text }) => {
    const [toggleColor, setToggleColor] = useState(false);

    useEffect(() => {
        const textAnimationLoop = () => {
            setToggleColor(true);

            setTimeout(() => {
                setToggleColor(false);
            }, 2500);
        };

        const intervalId = setInterval(textAnimationLoop, 5000);

        // 초기 애니메이션
        textAnimationLoop();

        // 컴포넌트가 언마운트 될 때 인터벌 클리어
        return () => clearInterval(intervalId);
    }, []);

    return (
        <S.LogoContainer>
            <S.LoadingImg />
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

export default Loading;
