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
        select: dataAll => {
            let result = dataAll?.posts?.filter(post =>
                post.content?.includes('"deskoration"'),
            );

            if (category) {
                return result.filter(article => {
                    const content = JSON.parse(article.content);
                    return content.deskoration.productItems.some(
                        item => item.detail.category === category,
                    );
                });
            } else {
                return result;
            }
        },
    });
    console.log(data);

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
            <Article articles={data} />
        </>
    );
};

export default Home;
