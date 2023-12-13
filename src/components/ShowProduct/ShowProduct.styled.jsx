import styled, { keyframes, css } from 'styled-components';
import theme from '../../styles/theme';
import { ReactComponent as Share } from '../../assets/images/Share.svg';

export const ShareIcon = styled(Share)``;

export const MapContianer = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 300px;
    margin-bottom: 14px;
    border: 1px solid ${theme.border};
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.05);

    overflow: hidden;
`;

export const LinkButton = styled.a.attrs(props => ({
    href: props.$link,
    target: '_blank',
}))`
    padding: 15px 33px;
    border: 2px solid ${theme.main};
    border-radius: 10px;
    color: ${theme.mainFont};

    &:hover {
        border: 5px solid ${theme.main};
    }
`;

export const MapBox = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;

    padding: 10px;

    background-color: #fff;

    box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.1);

    span {
        display: inline-block;

        margin-bottom: 4px;

        font-size: 16px;
        font-family: 'PreBold';
    }
    address {
        color: ${theme.subFont};
    }
`;

export const ProductBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ProductText = styled.div`
    div:nth-child(1) {
        font-family: 'PreBold';
        font-size: 16px;
        margin-bottom: 10px;
    }

    div:nth-child(2) {
        span:nth-child(1) {
            margin-right: 10px;
            color: ${theme.subFont};
            font-size: 12px;
        }
        span:nth-child(2) {
            color: ${theme.point};
            font-family: 'PreBold';
        }
    }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const ClipboardMessage = styled.div`
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 250px;
    padding: 5px;

    border-radius: 10px;

    color: white;
    text-align: center;

    background: rgba(15, 15, 15, 0.8);

    opacity: ${props => (props.$visible === null ? 0 : props.$visible ? 1 : 0)};

    ${props =>
        props.$visible === null
            ? css`
                  opacity: 0;
              `
            : props.$visible
            ? css`
                  animation: ${fadeIn} 0.5s ease-in-out;
              `
            : css`
                  animation: ${fadeOut} 0.8s ease-in-out;
              `};
`;
