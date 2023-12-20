import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as S from './Article.styled';

const Article = ({ articles, fetchNextPage }) => {
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } =
                sectionRef.current;
            if (
                Math.ceil(scrollTop + clientHeight) >= scrollHeight &&
                !loading
            ) {
                setLoading(true);
                fetchNextPage().then(() => setLoading(false));
            }
        };

        const sectionElement = sectionRef.current;
        sectionElement.addEventListener('scroll', handleScroll);
        return () => sectionElement.removeEventListener('scroll', handleScroll);
    }, [loading, fetchNextPage]);

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
