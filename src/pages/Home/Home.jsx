import React, { useEffect, useState } from 'react';
import * as S from './Home.styled';
import logoImg from '../../assets/images/Logo.svg';
import Article from './Article';
import Slide from './Slide';
import FirstConnectLoading from '../Loading/FirstConnectLoading';
import usePageHandler from '../../hooks/usePageHandler';

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);

    usePageHandler('image', logoImg);
    return (
        <>
            {isLoading ? (
                <FirstConnectLoading />
            ) : (
                <>
                    <Slide />
                    <Article />
                </>
            )}
        </>
    );
};

export default Home;
