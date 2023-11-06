import React, { useEffect, useState } from 'react';
import * as S from './Home.styled';
import logoImg from '../../assets/images/Logo.svg';
import Article from './Article';
import Slide from './Slide';
import usePageHandler from '../../hooks/usePageHandler';
import { GetAllPost } from '../../service/post_service';
import CommonLoading from '../Loading/CommonLoading';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const token = sessionStorage.getItem('tempToken');

    console.log('articles', articles);

    const tempApi = async token => {
        try {
            const result = await GetAllPost(token);
            // console.log('API보기2: ', result.posts);
            const deskoration = result.posts.filter(post =>
                post.content?.includes('"deskoration"'),
            );
            console.log('deskoration: ', deskoration);
            setArticles(deskoration); // Set the state with articles containing images
            setIsReady(true);
        } catch (error) {
            console.error('error');
        }
    };

    useEffect(() => {
        const desk_result = tempApi(token);
    }, []);

    console.log(isReady);

    usePageHandler('image', logoImg);
    return (
        <>
            {isReady ? (
                <CommonLoading />
            ) : (
                <>
                    <Slide />
                    <Article articles={articles} setArticles={setArticles} />
                </>
            )}
        </>
    );
};

export default Home;
