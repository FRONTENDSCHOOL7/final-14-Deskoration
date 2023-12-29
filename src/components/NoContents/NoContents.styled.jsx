import styled from 'styled-components';
import theme from '../../styles/theme';
import { ReactComponent as Add } from '../../assets/images/Add.svg';

export const NoContentsContainer = styled.div`
    margin-top: 10px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;

    span {
        display: block;
        text-align: center;
    }

    span:first-child {
        font-size: ${theme.fontSize.md};
        margin-bottom: 10px;
    }

    span:nth-child(2) {
        color: ${theme.subFont};
    }
`;

export const LinkBox = styled.div`
    padding: 10px 0;
    border-radius: 12px;
    color: #fff;
    background: linear-gradient(90deg, #685c53 16.45%, #8d7358 97.1%);

    &:hover {
        outline: 2px solid ${props => props.theme.main};
    }

    a {
        width: 100%;
        height: 100%;
        padding: 10px;
    }
`;

export const AddIcon = styled(Add)`
    path {
        fill: black;
    }
`;
