import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import useScroll from 'hooks/useScroll';

import * as S from './Content.styled';

const Content = ({ posts, fetchNextPage }) => {
    const loaderRef = useScroll(fetchNextPage);

    const location = useLocation();
    const isProfile = location.pathname.includes('/profile');

    return (
        <S.Section $isProfile={isProfile}>
            {posts?.map(post => (
                <Link
                    key={post._id !== undefined ? post._id : post.id}
                    to={
                        post._id !== undefined
                            ? `/detailPost/${post._id}`
                            : `/detailPost/${post.id}`
                    }
                >
                    <S.Article src={post.image} />
                </Link>
            ))}
            {fetchNextPage && (
                <div ref={loaderRef} style={{ height: '1px', width: '100%' }} />
            )}
        </S.Section>
    );
};

export default Content;
