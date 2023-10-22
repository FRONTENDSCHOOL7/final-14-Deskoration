import styled from 'styled-components';

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
        ${ImgControlBox} {
            display: flex;
            justify-content: space-around;

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
        /* color: #fff;
        background-color: #45522b; */
        outline: 7px solid ${props => props.theme.main};
    }
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
