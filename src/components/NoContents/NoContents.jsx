import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './NoContents.styled';

const NoContents = props => {
    const { title, subTitle, link, btnTxt } = props;
    return (
        <S.NoContentsContainer>
            <p>
                <span>{title}</span>
                <span>{subTitle}</span>
            </p>
            {!link ? null : (
                <S.LinkBox>
                    <Link to={link}>{btnTxt}</Link>
                </S.LinkBox>
            )}
        </S.NoContentsContainer>
    );
};

export default NoContents;
