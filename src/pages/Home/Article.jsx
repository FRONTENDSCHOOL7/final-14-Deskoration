import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as S from './Article.styled';

const Article = () => {
    const [articles, setArticles] = useState(Array(20).fill({}));
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef(null); // S.Section에 대한 참조 생성

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
        // 여기서 API 호출이나 다른 데이터 로딩 로직을 추가할 수 있습니다.
        setTimeout(() => {
            setArticles(prevArticles => [
                ...prevArticles,
                ...Array(20).fill({}),
            ]); // 예시로 8개의 게시물을 추가
            setLoading(false);
        }, 1000); // 1초 지연으로 예시
    };

    return (
        <>
            <S.Section ref={sectionRef}>
                {articles.map((article, index) => (
                    <Link to={'/board'}>
                        <S.Article></S.Article>
                    </Link>
                ))}
            </S.Section>
            {loading && <div>Loading...</div>}
        </>
    );
};

export default Article;
