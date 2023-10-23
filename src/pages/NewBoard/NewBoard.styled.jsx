import styled, { css } from 'styled-components';

import { ReactComponent as ChangeFile } from '../../assets/images/ChangeFile.svg';
import { ReactComponent as Delete } from '../../assets/images/Delete.svg';
import { ReactComponent as Add } from '../../assets/images/Add.svg';
import { ReactComponent as Back } from '../../assets/images/Backward.svg';

export const ChangeIcon = styled(ChangeFile)`
    path {
        fill: white;
    }
`;

export const DeleteIcon = styled(Delete)`
    path {
        fill: white;
    }
`;

export const AddIcon = styled(Add)`
    path {
        fill: black;
    }
`;

export const BackIcon = styled(Back)`
    vertical-align: top;
`;

export const NewBoardContainer = styled.div`
    position: relative;
    padding: 0 25px;
`;

export const NewBoardHeader = styled.header`
    display: flex;

    align-items: center;
    height: 70px;

    font-size: 24px;
    font-family: 'PreBold';
`;

export const ImgControlBox = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;

    padding: 15px;
    border-radius: 0 0 14px 14px;

    text-align: center;

    button {
        &:first-child,
        &:last-child {
            display: none;
        }
    }

    width: 100%;
`;

export const NewBoardFileContainer = styled.div`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    height: ${props => (props.$hasPhoto ? 'auto' : '400px')};

    border: 1px solid ${props => props.theme.border};
    border-radius: 14px;
    margin-bottom: 20px;

    img {
        width: 100%;
        border-radius: 14px;
    }
    input {
        display: none;
    }

    &:hover {
        img {
            cursor: ${props => (props.$hasPhoto ? 'grab' : 'default')};
        }

        ${ImgControlBox} {
            display: flex;
            justify-content: space-between;

            background: linear-gradient(transparent, rgba(0, 0, 0, 0.54));

            button {
                &:first-child,
                &:last-child {
                    display: block;
                }
            }
        }
    }
`;

export const FileInputButton = styled.button`
    border: 1px solid ${props => props.theme.border};

    border-radius: 14px;
    padding: 10px;

    &:hover {
        background-color: white;
        ${props =>
            props.$add
                ? css`
                      border: 5px solid ${props => props.theme.main};
                  `
                : css`
                      border: 1px solid ${props => props.theme.main};
                  `}

        svg {
            path {
                fill: ${props => props.theme.main};
            }
        }
    }
`;

export const ExplainTagP = styled.p`
    text-align: center;
    margin-bottom: 20px;
    color: ${props => props.theme.subFont};
`;
export const NewBoardTextarea = styled.textarea`
    display: block;
    outline: none;
    resize: none;

    width: 100%;
    height: 200px;

    border: 1px solid ${props => props.theme.border};
    border-radius: 14px;
    padding: 10px;
`;

export const SubmitNewBoardButton = styled.button`
    position: absolute;
    top: 20px;
    right: 25px;

    color: ${props => props.theme.point};
    font-size: 24px;
    font-family: 'PreBold';
`;
