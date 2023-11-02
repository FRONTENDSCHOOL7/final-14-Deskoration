import React, { useState } from 'react';
import { RegisterForm } from './RegisterForm';
import { PostUpload } from './PostUpload';
import * as S from './NewBoard.styled';
import { useLocation } from 'react-router-dom';
import { UploadPost } from '../../service/post_service';

const NewBoard = () => {
    const location = useLocation();
    const pathName = location.pathname;

    const [photoURL, setPhotoURL] = useState();
    const [file, setFile] = useState();

    const [textareaCount, setTextareaCount] = useState(0);
    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleTextCountChange = e => {
        setTextareaCount(e.target.value.length);
    };

    const deleteItem = itemID => {
        if (window.confirm('삭제 ㄱㄱ?')) {
            const updatedArray = items.filter(item => item.id !== itemID);
            setItems(updatedArray);
        }
        return;
    };
    const token = sessionStorage.getItem('tempToken');

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const result = await UploadPost(items, file, token);
            if (result.message === '내용 또는 이미지를 입력해주세요.') {
                alert(result.message);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.error('error');
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
            {pathName === '/newboard' ? (
                <form onSubmit={onSubmit}>
                    <PostUpload
                        items={items}
                        setItems={setItems}
                        setOffset={setOffset}
                        photoURL={photoURL}
                        setFile={setFile}
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
            ) : (
                <RegisterForm
                    items={items}
                    setItems={setItems}
                    offset={offset}
                />
            )}
        </S.NewBoardContainer>
    );
};

export default NewBoard;
