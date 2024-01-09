import React from 'react';
import { useNavigate } from 'react-router-dom';

import GradientButton from 'components/common/GradientButton/GradientButton';

import styled from 'styled-components';
import theme from 'styles/theme';
import { ReactComponent as Loading } from 'assets/images/Loading.svg';

const LoadingIcon = styled(Loading)`
    width: 200px;
    height: 300px;

    .light {
        fill: var(--light-color, 'none');
    }
`;

const NoneDataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    height: 100%;
    padding: 80px 20px;

    text-align: center;

    color: ${theme.main};
    font-size: 20px;

    h1 {
        color: ${theme.main};
        font-size: 36px;
    }

    p {
        margin-bottom: 20px;
    }
`;

const NotFoundPage = () => {
    const navigate = useNavigate();

    const lightColor = '#efc265';

    const handleClickBackButton = () => {
        navigate(-1);
    };

    return (
        <NoneDataWrapper>
            <h1>DESKORATION</h1>
            <LoadingIcon style={{ '--light-color': lightColor }} />
            <p>페이지를 찾을 수 없습니다</p>
            <GradientButton
                gra={'true'}
                padding={'20px'}
                width={'70%'}
                onClick={handleClickBackButton}
            >
                이전 페이지
            </GradientButton>
        </NoneDataWrapper>
    );
};

export default NotFoundPage;
