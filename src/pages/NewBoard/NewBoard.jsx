import React, { useState, useRef } from 'react';
import * as S from './NewBoard.styled';

import { ImgConvert } from '../../hooks/img_Uploader';

const NewBoardInFormButton = ({ name, handleClick }) => {
    return (
        <S.FileInputButton type="button" onClick={handleClick}>
            {name}
        </S.FileInputButton>
    );
};

const NewBoard = () => {
    const [photoURL, setPhotoURL] = useState('');

    const hiddenFileInput = useRef(null);

    const handleInputClick = event => {
        event.preventDefault();
        hiddenFileInput.current.click();
    };

    const handleFileChange = event => {
        const file = event.target.files[0];
        if (!file) {
            setPhotoURL(prev => setPhotoURL(prev));
        } else {
            ImgConvert(file, setPhotoURL);
        }
    };

    const deleteFile = () => {
        // 추후 컨펌 모달로 변경
        if (window.confirm('삭제하시겠습니까?')) {
            setPhotoURL('');
        }
    };

    return (
        <S.NewBoardContainer>
            <S.NewBoardHeader>
                <i>아이콘</i>
                <h4>게시물 작성</h4>
            </S.NewBoardHeader>
            <form>
                <S.NewBoardFileContainer $hasPhoto={photoURL}>
                    <>
                        {photoURL && <img src={photoURL} alt="photoURL" />}
                        <input
                            type="file"
                            onChange={handleFileChange}
                            ref={hiddenFileInput}
                        />
                        {photoURL ? (
                            <S.ImgControlBox>
                                <NewBoardInFormButton
                                    name="사진 변경"
                                    handleClick={handleInputClick}
                                />
                                {/* 추후 상품정보 입력 페이지로 변경되는 함수 handleClick에 추가 */}
                                <NewBoardInFormButton name="태그 추가" />
                                <NewBoardInFormButton
                                    name="사진 삭제"
                                    handleClick={deleteFile}
                                />
                            </S.ImgControlBox>
                        ) : (
                            <>
                                <NewBoardInFormButton
                                    name="사진 추가"
                                    handleClick={handleInputClick}
                                />
                            </>
                        )}
                    </>
                </S.NewBoardFileContainer>
                <S.NewBoardTextarea />
                <S.SubmitNewBoardButton type="submit">
                    올리기
                </S.SubmitNewBoardButton>
            </form>
        </S.NewBoardContainer>
    );
};

export default NewBoard;
