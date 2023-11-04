import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { UploadPost } from '../../service/post_service';

import RegisterForm from './RegisterForm';
import PostUploadForm from './PostUploadForm';

import * as S from './NewBoard.styled';

// trim 중
const NewBoard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;

    const token = sessionStorage.getItem('tempToken');

    const [apiContent, setApiContent] = useState();

    const [imageURL, setImageURL] = useState();
    const [imageFile, setImageFile] = useState();

    const [productItems, setProductItems] = useState([]);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const [textArea, setTextArea] = useState({
        message: '',
        length: 0,
    });

    const trimTextArea = () => {
        setTextArea(prev => ({
            ...prev,
            message: prev.message.trim(),
            length: prev.message.trim().length,
        }));
    };
    const handleMessageChange = e => {
        setTextArea({
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
        setApiContent({ message: textArea.message.trim(), productItems });
    }, [textArea.message, productItems]);

    const submitPost = async event => {
        event.preventDefault();
        if (!textArea.message || !imageURL) {
            alert('나의 데스크 셋업 이미지와 설명 칸을 비울 수 없습니다.');
        } else {
            try {
                const postData = await UploadPost(apiContent, imageFile, token);

                if (postData.message === '내용 또는 이미지를 입력해주세요.') {
                    alert(postData.message);
                } else {
                    console.log('성공', postData);
                }
            } catch (error) {
                console.log('error', error);
            }
        }
    };

    return (
        <S.NewBoardContainer>
            {/* <S.NewBoardHeader>
                <button>
                    <S.BackIcon />
                </button>
                <h4>게시물 작성</h4>
            </S.NewBoardHeader>{' '}
            */}
            {pathName === '/newboard' ? (
                <form onSubmit={submitPost}>
                    <PostUploadForm
                        productItems={productItems}
                        setProductItems={setProductItems}
                        setOffset={setOffset}
                        imageURL={imageURL}
                        setImageURL={setImageURL}
                        setImageFile={setImageFile}
                        deleteProduct={deleteProduct}
                    />
                    <S.NewBoardTextarea
                        value={textArea.message}
                        maxLength="100"
                        placeholder="나의 데스크 셋업에 대해서 얘기해주세요."
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
                    trimTextArea={trimTextArea}
                />
            )}
        </S.NewBoardContainer>
    );
};

export default NewBoard;
