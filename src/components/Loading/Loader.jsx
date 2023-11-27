import React, { useEffect, useState } from 'react';
import * as S from './Loader.styled';

const Loader = () => {
    const text = 'Deskoration';
    const [toggleColor, setToggleColor] = useState(false);

    useEffect(() => {
        const textAnimationLoop = () => {
            setToggleColor(true);

            setTimeout(() => {
                setToggleColor(false);
            }, 2000);
        };
        const intervalId = setInterval(textAnimationLoop, 5000);
        textAnimationLoop();
        return () => clearInterval(intervalId);
    }, []);

    return (
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
    );
};

export default Loader;
