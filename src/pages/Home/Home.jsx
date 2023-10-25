import React from 'react';
import * as S from './Home.styled';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Article from './Article';
import Slide from './Slide';
// 라우터 설치하기

const Home = () => {
    return (
        <>
            <Header />
            <Slide />
            <Article />
            <Footer />
        </>
    );
};

export default Home;
