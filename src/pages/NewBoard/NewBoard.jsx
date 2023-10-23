import React, { useState, useRef } from 'react';
import * as S from './NewBoard.styled';

import { ImgConvert } from '../../hooks/img_Uploader';

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
                <button>
                    <S.BackIcon />
                </button>
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
                                <S.FileInputButton
                                    type="button"
                                    onClick={handleInputClick}
                                >
                                    <S.ChangeIcon />
                                </S.FileInputButton>
                                <S.FileInputButton
                                    type="button"
                                    onClick={deleteFile}
                                >
                                    <S.DeleteIcon />
                                </S.FileInputButton>
                            </S.ImgControlBox>
                        ) : (
                            <S.FileInputButton
                                type="button"
                                onClick={handleInputClick}
                                $add
                            >
                                <S.AddIcon />
                            </S.FileInputButton>
                        )}
                    </>
                </S.NewBoardFileContainer>
                {photoURL && (
                    <S.ExplainTagP>
                        원하는 위치에 상품을 등록하세요.
                    </S.ExplainTagP>
                )}
                <S.NewBoardTextarea />
                <S.SubmitNewBoardButton type="submit">
                    올리기
                </S.SubmitNewBoardButton>
            </form>
        </S.NewBoardContainer>
    );
};

export default NewBoard;
