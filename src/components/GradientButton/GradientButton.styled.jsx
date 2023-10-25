import { styled, css } from 'styled-components';

export const GradientButton = styled.button`
    width: ${props => props.width};
    border: 1px solid ${props => props.theme.main};
    border-radius: 12px;
    padding: 5px 0;

    color: ${props => props.theme.main};

    ${props =>
        props.$gra &&
        css`
            color: #fff;
            background: linear-gradient(90deg, #45522b 48.51%, #d67a38 81.29%);
        `};

    &:hover {
        outline: 5px solid ${props => props.theme.main};
    }
`;
