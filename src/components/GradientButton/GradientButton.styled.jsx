import { styled, css } from 'styled-components';

export const GradientButton = styled.button`
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
            background: linear-gradient(90deg, #45522b 48.51%, #d67a38 81.29%);
        `};

    &:hover {
        outline: 2px solid ${props => props.theme.main};
    }
`;
