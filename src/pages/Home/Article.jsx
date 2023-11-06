import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as S from './Article.styled';
import { GetAllPost } from '../../service/post_service';

const Article = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef(null);
    const token = sessionStorage.getItem('tempToken');

    const fetchAllPost = async token => {
        try {
            const result = await GetAllPost(token);
            const deskoration = result.posts.filter(post =>
                post.content?.includes('"deskoration"'),
            );
            console.log('deskoration: ', deskoration);
            setArticles(deskoration);
        } catch (error) {
            console.error('error');
        }
    };

    console.log('articles', articles);
    useEffect(() => {
        fetchAllPost(token);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } =
                sectionRef.current;
            if (scrollTop + clientHeight >= scrollHeight && !loading) {
                loadMoreArticles();
            }
        };

        const sectionElement = sectionRef.current;
        sectionElement.addEventListener('scroll', handleScroll);
        return () => sectionElement.removeEventListener('scroll', handleScroll);
    }, [loading]);

    const loadMoreArticles = () => {
        setLoading(true);

        setTimeout(() => {
            setArticles(prevArticles => [
                ...prevArticles,
                ...Array(8).fill({}),
            ]);
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <S.Section ref={sectionRef}>
                {articles.map(article => (
                    <Link key={article._id} to={`/detailpost/${article._id}`}>
                        <S.Article src={article.image}></S.Article>
                    </Link>
                ))}
            </S.Section>
            <S.SearchButton type="button">
                <S.SearchIcon />
            </S.SearchButton>
            {loading && <div>Loading...</div>}
        </>
    );
};

export default Article;
