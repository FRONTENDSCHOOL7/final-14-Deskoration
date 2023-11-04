import { styled, css } from 'styled-components';

export const GradientButton = styled.button.attrs(props => ({
    type: props.type || 'button',
}))`
    width: ${props => props.width};
    border: 1px solid ${props => props.theme.main};
    border-radius: 12px;
    padding: ${props => props.$padding};

    color: ${props => props.theme.main};

    ${props =>
        props.$gra &&
        css`
            border: none;
            color: #fff;
            background: linear-gradient(90deg, #685c53 16.45%, #8d7358 97.1%);
        `};

    &:hover {
        outline: 2px solid ${props => props.theme.main};
    }
`;
