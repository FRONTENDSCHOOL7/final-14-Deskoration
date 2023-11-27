import React, { useEffect, useState } from 'react';
import * as S from './Home.styled';
import logoImg from '../../assets/images/Logo.svg';
import Article from './Article';
import Slide from './Slide';
import usePageHandler from '../../hooks/usePageHandler';
import { getAllPostApi } from '../../service/post_service';
import Loader from '../../components/Loading/Loader';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const token = sessionStorage.getItem('Token');

    usePageHandler('image', logoImg);

    const tempApi = async token => {
        try {
            setIsLoading(true);
            const result = await getAllPostApi(token);
            // console.log('API보기2: ', result.posts);
            const deskoration = result.posts.filter(post =>
                post.content?.includes('"deskoration"'),
            );
            // console.log('deskoration: ', deskoration);
            setArticles(deskoration); // Set the state with articles containing images
        } catch (error) {
            console.error('error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        tempApi(token);
    }, [token]);

    if (isLoading) {
        return <Loader></Loader>;
    }

    return (
        <>
            <Slide />
            <Article articles={articles} setArticles={setArticles} />
        </>
    );
};

export default Home;
