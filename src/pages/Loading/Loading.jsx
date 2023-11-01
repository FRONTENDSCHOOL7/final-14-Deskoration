import React, { useEffect, useState } from 'react';
import * as S from './Loading.styled';
import { useNavigate } from 'react-router-dom';

const Loading = ({ text }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [toggleColor, setToggleColor] = useState(true);

    useEffect(() => {
        setToggleColor(false);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    return (
        <S.LogoContainer>
            <S.LoadingImg $isLoading={isLoading} />
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
