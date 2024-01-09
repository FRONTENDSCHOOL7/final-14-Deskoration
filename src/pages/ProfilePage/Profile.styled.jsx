import styled from 'styled-components';
import theme from 'styles/theme';

import { ReactComponent as More } from 'assets/images/Dots_vertical.svg';

export const ProfileContainer = styled.div`
    width: 100%;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 100px;
        height: 100px;
        border-radius: 100%;
        object-fit: cover;
        border: 1px solid ${theme.border};
    }

    div {
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        flex-grow: 1;
        text-align: center;
    }

    div > p:first-child {
        font-size: ${theme.fontSize.md};
        font-family: 'PreBold', sans-serif;
        margin: 10px 0;
    }
`;

export const UserPostings = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
    grid-gap: 10px;
    margin-top: 20px;
    color: ${theme.mainFont};

    @media screen and (min-width: 600px) {
        grid-template-columns: repeat(3, 1fr);
    }

    a {
        aspect-ratio: 1/1;
        max-width: 280px;
        max-height: 280px;
    }
    img {
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        transition: border 0.1s ease;
        &:hover {
            border: 3px solid ${theme.main};
        }
        border: 1px solid ${theme.border};
        border-radius: 10px;
    }

    &::-webkit-scrollbar {
        width: 7px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }

    &::-webkit-scrollbar-track {
        background-color: #f5f5f5;
        border-radius: 10px;
    }
`;

export const MoreButton = styled.button`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 15px;
    right: 20px;
    transform: rotate(90deg);
`;

export const MoreIcon = styled(More)`
    width: 25px;
    height: 25px;
`;

export const ToggleButton = styled.button`
    color: ${theme.subFont};
    padding-left: 4px;
    font-weight: 700;
`;
