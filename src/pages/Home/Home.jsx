import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getAllPostAPI } from '../../service/post_service';

import Loader from '../../components/Loading/Loader';
import Slide from './Slide';
import Article from './Article';
import NotFoundPage from '../404/NotFoundPage';

import usePageHandler from '../../hooks/usePageHandler';
import logoImg from '../../assets/images/Logo.svg';

const Home = () => {
    const [category, setCategory] = useState('All');

    usePageHandler('image', logoImg);

    const {
        data: articles,
        fetchNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ['getAllPosts'],
        queryFn: ({ pageParam = 0 }) => getAllPostAPI(pageParam),
        select: data => {
            const allPosts = data.pages.flatMap(page => page.posts);
            return category === 'All'
                ? allPosts.filter(post =>
                      post.content?.includes('"deskoration"'),
                  )
                : allPosts
                      .filter(post => post.content?.includes('"deskoration"'))
                      .filter(article => {
                          const content = JSON.parse(article.content);
                          return content.deskoration.productItems.some(
                              item => item.detail.category === category,
                          );
                      });
        },
        getNextPageParam: (lastPage, allPages) => {
            const morePagesExist = lastPage?.posts?.length === 200;
            if (!morePagesExist) return false;
            return allPages.length * 200;
        },
    });

    if (isLoading) {
        return <Loader />;
    }

    const handleCategory = selectedCategory => {
        if (category !== selectedCategory) {
            setCategory(selectedCategory);
        }
    };

    return (
        <>
            <Slide category={handleCategory} />
            <Article articles={articles} fetchNextPage={fetchNextPage} />
            {error && <NotFoundPage />}
        </>
    );
};

export default Home;
