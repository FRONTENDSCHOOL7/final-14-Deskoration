import React, { useEffect, useState } from 'react';
import { RegisterForm } from './RegisterForm';
import { PostUpload } from './PostUpload';
import * as S from './NewBoard.styled';
import { useLocation } from 'react-router-dom';

const NewBoard = () => {
    const location = useLocation();

    const [state, setState] = useState(location.state);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [photoURL, setPhotoURL] = useState('');
    const [textareaCount, setTextareaCount] = useState(0);

    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleTextCountChange = e => {
        setTextareaCount(e.target.value.length);
    };

    const handleShowRegisterForm = () => setShowRegisterForm(prev => !prev);

    useEffect(() => {
        handleShowRegisterForm();
    }, [state]);

    const deleteItem = itemID => {
        if (window.confirm('삭제 ㄱㄱ?')) {
            const updatedArray = items.filter(item => item.id !== itemID);
            setItems(updatedArray);
        }
        return;
    };

    const onSubmit = () => console.log('submit');

    return (
        <S.NewBoardContainer>
            <S.NewBoardHeader>
                <button>
                    <S.BackIcon />
                </button>
                <h4>게시물 작성</h4>
            </S.NewBoardHeader>
            {showRegisterForm ? (
                <RegisterForm
                    items={items}
                    setItems={setItems}
                    offset={offset}
                    handleShowRegisterForm={handleShowRegisterForm}
                    state={state}
                    setState={setState}
                />
            ) : (
                <form onSubmit={onSubmit}>
                    <PostUpload
                        items={items}
                        setItems={setItems}
                        setOffset={setOffset}
                        handleShowRegisterForm={handleShowRegisterForm}
                        photoURL={photoURL}
                        setPhotoURL={setPhotoURL}
                        deleteItem={deleteItem}
                    />
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
            )}
        </S.NewBoardContainer>
    );
};

export default NewBoard;
