import styled, { keyframes } from 'styled-components';

const baseLineHeight = '30px';
const grayRGB = '170, 170, 170';
const alphaValue = 0.2;
const offGray = `rgba(${grayRGB}, ${alphaValue})`;
const spinDuration = '1s';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
    border-radius: 50%;
    width: ${baseLineHeight};
    height: ${baseLineHeight};
    border: 0.25rem solid ${offGray};
    border-top-color: rgb(${grayRGB}); // rgb() is used here for consistency
    animation: ${spin} ${spinDuration} infinite linear;
`;
