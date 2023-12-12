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
    const token = sessionStorage.getItem('Token');
    const [category, setCategory] = useState(null);

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

    const handleCategory = selectedCategory => {
        if (category !== selectedCategory) {
            setCategory(selectedCategory);
        }
    };

    let articles = [];
    if (data) {
        if (category) {
            articles = data?.posts?.filter(post =>
                post.content?.includes('"deskoration"'),
            );
            articles = articles.filter(article => {
                const content = JSON.parse(article.content);
                return content.deskoration.productItems.some(
                    item => item.detail.category === category,
                );
            });
        } else {
            articles = data?.posts?.filter(post =>
                post.content?.includes('"deskoration"'),
            );
        }
    }

    return (
        <>
            <Slide category={handleCategory} />
            <Article articles={articles} />
        </>
    );
};

export default Home;
