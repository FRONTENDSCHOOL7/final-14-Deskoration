import React, { useEffect, useState } from 'react';
import * as S from './Home.styled';
import logoImg from '../../assets/images/Logo.svg';
import Article from './Article';
import Slide from './Slide';
import usePageHandler from '../../hooks/usePageHandler';
import { getAllPostApi } from '../../service/post_service';
import Loader from '../../components/Loading/Loader';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
    // const [articles, setArticles] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const token = sessionStorage.getItem('Token');

    usePageHandler('image', logoImg);

    const { data, error, isLoading } = useQuery({
        queryKey: ['getAllPosts', token],
        queryFn: () => getAllPostApi(token),
    });

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        console.error(error);
    }

    const articles = data?.posts?.filter(post =>
        post.content?.includes('"deskoration"'),
    );
    console.log(articles);

    return (
        <>
            <Slide />
            <Article articles={articles} />
        </>
    );
};

export default Home;
