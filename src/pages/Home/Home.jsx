import React from 'react';
import * as S from './Home.styled';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Article from './Article';

const Home = () => {
    return (
        <>
            <Header />
            <Article />
            <Footer />
        </>
    );
};

export default Home;
