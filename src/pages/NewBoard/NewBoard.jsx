import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { UploadPost } from '../../service/post_service';

import RegisterForm from './RegisterForm';
import PostUpload from './PostUploadForm';

import * as S from './NewBoard.styled';

const NewBoard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const message = location.state?.message;

    const token = sessionStorage.getItem('tempToken');

    const [apiContent, setApiContent] = useState();

    const [imageURL, setImageURL] = useState();
    const [imageFile, setImageFile] = useState();

    const [productItems, setProductItems] = useState([]);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const [textArea, setTextares] = useState({
        message: message,
        length: 0,
    });

    const handleMessageChange = e => {
        setTextares({
            message: e.target.value,
            length: e.target.value.length,
        });
    };

    const deleteProduct = itemID => {
        if (window.confirm('삭제 ㄱㄱ?')) {
            const updatedProductItems = productItems.filter(
                item => item.detail.id !== itemID,
            );
            setProductItems(updatedProductItems);
        }
        return;
    };

    useEffect(() => {
        setApiContent({ message: textArea.message, productItems });
    }, [textArea.message, productItems]);

    const submitPost = async event => {
        event.preventDefault();
        try {
            const postData = await UploadPost(apiContent, imageFile, token);

            if (postData.message === '내용 또는 이미지를 입력해주세요.') {
                alert(postData.message);
            } else {
                console.log(postData);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <S.NewBoardContainer>
            <S.NewBoardHeader>
                <button onClick={() => navigate(-1)}>
                    <S.BackIcon />
                </button>
                <h4>게시물 작성</h4>
            </S.NewBoardHeader>
            {pathName === '/newboard' ? (
                <form onSubmit={submitPost}>
                    <PostUpload
                        productItems={productItems}
                        setProductItems={setProductItems}
                        setOffset={setOffset}
                        imageURL={imageURL}
                        setImageURL={setImageURL}
                        setImageFile={setImageFile}
                        message={textArea.message}
                        deleteProduct={deleteProduct}
                    />
                    <S.NewBoardTextarea
                        value={textArea.message}
                        maxLength="100"
                        placeholder="상품 관련 내용을 입력해주세요"
                        onChange={handleMessageChange}
                    />
                    <S.TextareaCounterP>
                        {textArea.length}/100
                    </S.TextareaCounterP>
                    <S.SubmitNewBoardButton type="submit">
                        올리기
                    </S.SubmitNewBoardButton>
                </form>
            ) : (
                <RegisterForm
                    productItems={productItems}
                    setProductItems={setProductItems}
                    offset={offset}
                />
            )}
        </S.NewBoardContainer>
    );
};

export default NewBoard;
