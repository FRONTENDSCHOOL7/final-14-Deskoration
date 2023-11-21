import styled, { keyframes, css } from 'styled-components';
import theme from '../../styles/theme';
import { ReactComponent as Share } from '../../assets/images/Share.svg';

export const ShareIcon = styled(Share)``;

export const MapContianer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 300px;
    margin-bottom: 14px;
    border: 1px solid ${theme.border};
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.05);
`;

export const LinkButton = styled.a.attrs(props => ({ href: props.$link }))`
    padding: 15px 33px;
    border: 2px solid ${theme.main};
    border-radius: 10px;
    color: ${theme.mainFont};
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
            color: #999;
            font-size: 12px;
        }
        span:nth-child(2) {
            color: ${theme.point};
            font-family: 'PreBold';
        }
    }
`;

export const ClipboardBox = styled.div`
    position: relative;
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

export const GuideClipboard = styled.div`
    position: absolute;
    top: 30px;
    right: 0;

    width: 250px;
    padding: 5px;

    border: 2px solid ${theme.main};
    border-radius: 10px;
    outline: 3px solid ${theme.gra};

    color: #999999;
    text-align: center;

    background: #fff;

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
