import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as S from './Article.styled';
import DetailPost from '../DetailPost/DetailPost';
import { GetAllPost, GetMyPost } from '../../service/post_service';

const Article = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef(null); // S.Section에 대한 참조 생성
    const token = sessionStorage.getItem('tempToken');
    const tempAccountName = sessionStorage.getItem('tempAccountName');

    const tempApi = async token => {
        try {
            const result = await GetAllPost(token);
            // console.log('API보기2: ', result.posts);
            const deskoration = result.posts.filter(post =>
                post.content?.includes('"deskoration"'),
            );
            console.log('deskoration: ', deskoration);
            setArticles(deskoration); // Set the state with articles containing images
        } catch (error) {
            console.error('error');
        }
    };

    console.log('articles', articles);
    useEffect(() => {
        const desk_result = tempApi(token);
    }, []);

    const postImage = articles.map(item => item.image);

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
            ]); // 예시로 8개의 게시물을 추가
            setLoading(false);
        }, 1000); // 1초 지연으로 예시
        console.log('스크롤 후 aricles:', articles);
    };

    return (
        <>
            <S.Section ref={sectionRef}>
                {articles.map(article => (
                    <Link key={article.id} to={`/detailpost/${article._id}`}>
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
