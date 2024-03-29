import styled, { css, keyframes } from 'styled-components';

import { ReactComponent as ChangeFile } from 'assets/images/ChangeFile.svg';
import { ReactComponent as Delete } from 'assets/images/Delete.svg';
import { ReactComponent as Add } from 'assets/images/Add.svg';

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

export const NewPostontainer = styled.div`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    height: ${props => (props.$hasPhoto ? 'auto' : '300px')};

    border: 1px solid ${props => props.theme.border};
    border-radius: 14px;
    margin-bottom: 20px;

    > img {
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
const Zoom = keyframes`
    0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.2);
    opacity: 1;
  }
`;

export const FileInputButton = styled.button`
    ${props =>
        !props.$add &&
        css`
            border: 1px solid ${props => props.theme.border};
        `}

    border-radius: 14px;
    padding: 10px;

    &:hover {
        background-color: white;
        ${props =>
            props.$add
                ? css`
                      border: none;
                  `
                : css`
                      border: 1px solid ${props => props.theme.main};
                  `}
        svg {
            animation: ${Zoom} 0.4s forwards;
            rect {
                fill: ${props => props.theme.main};
                stroke: ${props => props.theme.main};
            }
            line {
                stroke: #fff;
            }
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
