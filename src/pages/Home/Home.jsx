import React, { useEffect } from 'react';
import * as S from './Home.styled';
import logoImg from '../../assets/images/Logo.svg';
import Article from './Article';
import Slide from './Slide';
import usePageHandler from '../../hooks/usePageHandler';

const Home = () => {
    usePageHandler('image', logoImg);
    return (
        <>
            <Slide />
            <Article />
        </>
    );
};

export default Home;
