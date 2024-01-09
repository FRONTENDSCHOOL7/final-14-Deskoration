import styled from 'styled-components';
import theme from '../../../styles/theme';

export const UserDataList = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: center;

    > * {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        padding: 4px;
    }

    a p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    a:nth-child(2) {
        border-left: 1px solid ${theme.border};
        border-right: 1px solid ${theme.border};
    }

    p span:first-child {
        font-family: 'PreBold', sans-serif;
        font-size: ${theme.fontSize.md};
        margin-bottom: 8px;
    }

    p span:nth-child(2) {
        color: ${theme.subFont};
    }
`;

export const SocialButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;
