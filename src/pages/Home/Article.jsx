import React from 'react';
import { Link } from 'react-router-dom';
import useScroll from '../../hooks/useScroll';
import * as S from './Article.styled';
import { useLocation } from 'react-router-dom';

const Article = ({ articles, fetchNextPage }) => {
    const loaderRef = useScroll(fetchNextPage);

    const location = useLocation();
    const isProfile = location.pathname.includes('/profile');

    return (
        <>
            <S.Section $isProfile={isProfile}>
                {articles?.map(article => (
                    <Link
                        key={
                            article._id !== undefined ? article._id : article.id
                        }
                        to={
                            article._id !== undefined
                                ? `/detailPost/${article._id}`
                                : `/detailPost/${article.id}`
                        }
                    >
                        <S.Article src={article.image}></S.Article>
                    </Link>
                ))}
                {fetchNextPage && (
                    <div
                        ref={loaderRef}
                        style={{ height: '1px', width: '100%' }}
                    />
                )}
            </S.Section>
        </>
    );
};

export default Article;
