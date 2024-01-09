import { styled } from 'styled-components';

import { ReactComponent as Close } from '../../assets/images/Close.svg';

export const Dialog = styled.dialog`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);

    z-index: 999;
`;

export const ConfirmModalContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
`;

export const ConfirmModalInnerContainer = styled.div`
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

export const ConfirmModalQustion = styled.h3`
    font-size: 24px;
    font-family: 'PreBold';

    margin-bottom: 20px;
`;

export const ConfirmModalExplain = styled.div`
    color: ${props => props.theme.subFont};
`;

export const ConfirmModalButtonBox = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    width: 100%;
`;

export const CloseConfirmModalButton = styled.button`
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
`;

export const CloseModalIcon = styled(Close)`
    color: ${props => props.theme.subFont};
`;
