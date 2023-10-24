import React, { useState, useRef } from 'react';
import { RegisterForm } from './RegisterForm';
import { PostUpload } from './PostUpload';
import * as S from './NewBoard.styled';

import { ImgConvert } from '../../hooks/img_Uploader';

const NewBoard = () => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [photoURL, setPhotoURL] = useState('');
    const [textareaCount, setTextareaCount] = useState(0);
    const hiddenFileInput = useRef(null);
    const [data, setData] = useState({
        id: '',
        location: {},
        category: '',
        productName: '',
        price: '',
        store: '',
        link: '',
    });
    const handleTextCountChange = e => {
        setTextareaCount(e.target.value.length);
    };

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

    const checkItemsCount = () => {
        items.length < 5
            ? setShowRegisterForm(true)
            : alert('상품은 최대 5개까지 추가할 수 있습니다.');
    };

    //form submit 함수
    const handleSubmit = event => {
        event.preventDefault();
    };

    const dragNDropStyle = showRegisterForm ? { display: 'none' } : {};
    const registerFormStyle = showRegisterForm ? {} : { display: 'none' };

    return (
        <>
            <S.NewBoardContainer>
                <S.NewBoardHeader>
                    <button>
                        <S.BackIcon />
                    </button>
                    <h4>게시물 작성</h4>
                </S.NewBoardHeader>
                <form style={{ ...dragNDropStyle }} onSubmit={handleSubmit}>
                    <PostUpload
                        setData={setData}
                        setOffset={setOffset}
                        items={items}
                        setItems={setItems}
                        photoURL={photoURL}
                        handleInputClick={handleInputClick}
                        handleFileChange={handleFileChange}
                        deleteFile={deleteFile}
                        hiddenFileInput={hiddenFileInput}
                        checkItemsCount={checkItemsCount}
                    />
                    {photoURL && (
                        <S.ExplainTagP>
                            원하는 위치에 상품을 등록하세요.
                        </S.ExplainTagP>
                    )}
                    <S.NewBoardTextarea
                        maxLength="100"
                        placeholder="상품 관련 내용을 입력해주세요"
                        onChange={handleTextCountChange}
                    />
                    <S.TextareaCounterP>{textareaCount}/100</S.TextareaCounterP>
                    <S.SubmitNewBoardButton type="submit">
                        올리기
                    </S.SubmitNewBoardButton>
                </form>
                <RegisterForm
                    displayStyle={registerFormStyle}
                    setShowRegisterForm={setShowRegisterForm}
                    items={items}
                    setItems={setItems}
                    data={data}
                    setData={setData}
                    offset={offset}
                />
            </S.NewBoardContainer>
        </>
    );
};

export default NewBoard;
