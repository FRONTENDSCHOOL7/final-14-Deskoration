import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './NoContents.styled';

const NoContents = props => {
    const { mainTxt, subTxt, link, btnLabel } = props;
    return (
        <S.NoContentsContainer>
            <p>
                <span>{mainTxt}</span>
                <span>{subTxt}</span>
            </p>
            {!link ? null : (
                <S.LinkBox>
                    <Link to={link}>{btnLabel}</Link>
                </S.LinkBox>
            )}
        </S.NoContentsContainer>
    );
};

export default NoContents;
