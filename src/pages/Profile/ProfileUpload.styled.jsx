import styled from 'styled-components';

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
    width: 36px;
    height: 36px;
    padding: 4px;
    background-color: ${({ theme }) => theme.point};
    border-radius: 50%;
    cursor: pointer;
`;

export const ImgUploadBox = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
`;

export const InputBox = styled.div`
    margin: 30px 0;
`;
