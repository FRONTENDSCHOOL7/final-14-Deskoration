import { styled } from 'styled-components';

export const Dialog = styled.dialog`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    border: none;

    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);

    z-index: 999;
`;

export const AlertModalContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
`;

export const AlertModalInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: #fff;
    text-align: center;
    border-radius: 14px;
    padding: 15px;
    position: relative;

    width: 300px;
    height: 350px;
`;

export const AlertText = styled.h3`
    font-size: 16px;
    font-family: 'PreBold';

    margin-bottom: 20px;
`;

export const AlertmModalButtonBox = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    width: 100%;
`;
