import styled from 'styled-components';
import { ReactComponent as ImgUploadFile } from '../../assets/images/ImgUpload.svg';
import { ReactComponent as Delete } from '../../assets/images/Delete.svg';

export const ProfileTitle = styled.h4`
    margin-bottom: 30px;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const ProfileContainer = styled.div`
    margin-top: 10px;
    max-width: 450px;
    margin: 0 auto;
`;
export const ProfileImgBox = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 0 auto;
    &::before {
    }

    img {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        border: 1px solid ${({ theme }) => theme.border};
        object-fit: cover;
    }
    button {
        width: 34px;
        height: 34px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: ${({ theme }) => theme.point};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const DeleteIcon = styled(Delete)`
    path {
        fill: #fff;
    }
`;

export const ProfileImg = styled.img`
    width: 110px;
    height: 110px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.border};
    object-fit: cover;
`;

export const ImgUploadIcon = styled(ImgUploadFile)`
    width: 24px;
    height: 24px;
    path {
        stroke: #fff;
    }
`;

export const ImgUploadBox = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;

    input {
        display: none;
    }
    label {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 34px;
        height: 34px;
        padding: 4px;
        background-color: ${({ theme }) => theme.point};
        border-radius: 50%;
        cursor: pointer;
    }
`;

export const InputBox = styled.div`
    margin: 30px 0;
`;
