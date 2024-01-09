import styled, { keyframes, css } from 'styled-components';

export const BottomSheetContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    overflow: hidden;
    visibility: ${props => (props.$isBottomSheet ? 'visible' : 'hidden')};
    opacity: ${props => (props.$isBottomSheet ? '1' : '0')};
    transition: all 0.3s;
    z-index: 1000;
`;

const FadeIn = keyframes`
    from {
        opacity: 0.5;
        transform: translate3d(0, 100%, 0);
    }
    to {
        opacity: 1;
        transform: translateZ(0);
}
`;

const FadeOut = keyframes`
    from {
        opacity: 1;
        transform: translateZ(0);
    }
    to {
        opacity: 0.5;
        transform: translate3d(0, 100%, 0);
    } 
`;

export const BottomSheetBox = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${props => (props.$oneButton ? '150px' : '200px')};

    background: #fff;

    border-radius: 20px 20px 0 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;

    ${props =>
        props.$isBottomSheet
            ? css`
                  animation: ${FadeIn} 0.3s;
              `
            : css`
                  animation: ${FadeOut} 0.3s;
              `}
`;
