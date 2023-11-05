import styled from 'styled-components';
import GradientButton from '../../components/GradientButton/GradientButton';
import { ReactComponent as Back } from '../../assets/images/Backward.svg';

export const BackIcon = styled(Back)`
    vertical-align: top;
`;

export const NewBoardContainer = styled.div`
    /* position: relative; */
    /* padding: 0 25px; */
    height: 100%;
    overflow: auto;
`;

export const NewBoardHeader = styled.header`
    display: flex;

    align-items: center;
    height: 70px;

    font-size: 24px;
    font-family: 'PreBold';
`;

export const NewBoardTextarea = styled.textarea`
    display: block;
    outline: none;
    resize: none;

    width: 100%;
    height: 250px;

    border: 1px solid ${props => props.theme.border};
    border-radius: 14px;
    padding: 10px;
`;

export const TextareaCounterP = styled.p`
    text-align: right;
    margin-top: 7px;
    margin-right: 5px;
    color: ${props => props.theme.subFont};
`;

export const SubmitButtonBox = styled.div`
    position: absolute;
    top: 18px;
    right: 25px;

    color: ${props => props.theme.point};
    font-size: 24px;
    font-family: 'PreBold';
`;
