import React from 'react';
import { Link } from 'react-router-dom';
import useScroll from '../../hooks/useScroll';
import * as S from './Article.styled';

const Article = ({ articles, fetchNextPage }) => {
    const loaderRef = useScroll(fetchNextPage);

    return (
        <>
            <S.Section>
                {articles.map(article => (
                    <Link key={article._id} to={`/detailPost/${article._id}`}>
                        <S.Article src={article.image}></S.Article>
                    </Link>
                ))}
                <div ref={loaderRef} style={{ height: '1px', width: '100%' }} />
            </S.Section>
        </>
    );
};

export default Article;
