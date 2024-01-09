import React, { useState } from 'react';

import { useInfiniteAllPostsData } from 'hooks/useQueryData';
import usePageHandler from 'hooks/usePageHandler';

import Loader from 'components/common/Loading/Loader';
import Slide from 'components/Home/Slide/Slide';
import Content from 'components/Home/Content/Content';
import NotFoundPage from '../404/NotFoundPage';

import logoImg from 'assets/images/Logo.svg';

const HomePage = () => {
    const [category, setCategory] = useState('All');

    const {
        isLoading,
        data: posts,
        fetchNextPage,
        isError,
    } = useInfiniteAllPostsData(category);

    usePageHandler('image', logoImg);

    const handleCategory = selectedCategory => {
        if (category !== selectedCategory) {
            setCategory(selectedCategory);
        }
    };

    return (
        <>
            {isLoading && <Loader />}
            <Slide category={handleCategory} />
            <Content posts={posts} fetchNextPage={fetchNextPage} />
            {isError && <NotFoundPage />}
        </>
    );
};

export default HomePage;
