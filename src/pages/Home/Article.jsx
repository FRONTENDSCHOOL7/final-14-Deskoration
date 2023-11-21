import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as S from './Article.styled';

const Article = ({ articles, setArticles }) => {
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef(null); // S.Section에 대한 참조 생성
    const token = sessionStorage.getItem('Token');

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } =
                sectionRef.current;
            if (
                Math.ceil(scrollTop + clientHeight) >= scrollHeight &&
                !loading
            ) {
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
                // ...Array(8).fill({}),
            ]);
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <S.Section ref={sectionRef}>
                {articles.map(article => (
                    <Link key={article._id} to={`/detailPost/${article._id}`}>
                        <S.Article src={article.image}></S.Article>
                    </Link>
                ))}
            </S.Section>
            {loading && <div>Loading...</div>}
        </>
    );
};

export default Article;
