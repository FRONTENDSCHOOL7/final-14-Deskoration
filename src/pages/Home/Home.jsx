import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAllPostApi } from '../../service/post_service';

import Loader from '../../components/Loading/Loader';
import Slide from './Slide';
import Article from './Article';

import usePageHandler from '../../hooks/usePageHandler';
import logoImg from '../../assets/images/Logo.svg';

const Home = () => {
    const token = sessionStorage.getItem('Token');
    const [category, setCategory] = useState('All');

    usePageHandler('image', logoImg);

    const {
        data: articles,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['getAllPosts', token],
        queryFn: () => getAllPostApi(token),
        select: data =>
            category === 'All'
                ? data?.posts?.filter(post =>
                      post.content?.includes('"deskoration"'),
                  )
                : data?.posts
                      ?.filter(post => post.content?.includes('"deskoration"'))
                      .filter(article => {
                          const content = JSON.parse(article.content);
                          return content.deskoration.productItems.some(
                              item => item.detail.category === category,
                          );
                      }),
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

    return (
        <>
            <Slide category={handleCategory} />
            <Article articles={articles} />
        </>
    );
};

export default Home;
