import styled from 'styled-components';
import { ReactComponent as ImgUploadFile } from '../../assets/images/ImgUpload.svg';
import { ReactComponent as Delete } from '../../assets/images/Delete.svg';

export const ProfileTitle = styled.h4`
    margin-bottom: 30px;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const ProfileMain = styled.div`
    padding: 0 25px;
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
`;

export const DeleteButton = styled.button`
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

export const ImgUploadInput = styled.input`
    display: none;
`;

export const ImgUploadLabel = styled.label`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    padding: 4px;
    background-color: ${({ theme }) => theme.point};
    border-radius: 50%;
    cursor: pointer;
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
`;

export const InputBox = styled.div`
    margin: 30px 0;
`;
