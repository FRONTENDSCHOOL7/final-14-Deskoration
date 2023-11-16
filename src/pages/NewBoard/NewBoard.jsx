import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { uploadPostApi } from '../../service/post_service';
import GradientButton from '../../components/GradientButton/GradientButton';
import usePageHandler from '../../hooks/usePageHandler';

import RegisterForm from './RegisterForm';
import PostUploadForm from './PostUploadForm';

import * as S from './NewBoard.styled';

const NewBoard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const { postData } = location.state;
    // const { postId } = useParams();

    const postOriginData = JSON.parse(postData.content);

    const detailPost = pathName.includes('/detailPost');

    const token = sessionStorage.getItem('Token');
    const [apiContent, setApiContent] = useState();

    const [imageURL, setImageURL] = useState();
    const [imageFile, setImageFile] = useState();

    const [productItems, setProductItems] = useState([]);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [textArea, setTextArea] = useState({
        message: '',
        length: 0,
    });

    usePageHandler('text', detailPost ? '아이템 보기' : '게시글 작성');

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
        if (window.confirm('상품을 삭제 하겠습니까?')) {
            const updatedProductItems = productItems.filter(
                item => item.detail.id !== itemID,
            );
            setProductItems(updatedProductItems);
        }
        return;
    };

    useEffect(() => {
        setApiContent({ message: textArea.message.trim(), productItems });
        console.log(postOriginData);
    }, [textArea.message, productItems, postData]);

    const submitPost = event => {
        event.preventDefault();
        if (!textArea.message || !imageURL) {
            alert('나의 데스크 셋업 이미지와 설명 칸을 비울 수 없습니다.');
            return null;
        } else {
            uploadPostApi(apiContent, imageFile, token)
                .then(postData => {
                    if (
                        postData.message === '내용 또는 이미지를 입력해주세요.'
                    ) {
                        alert(postData.message);
                    }
                })
                .catch(error => {
                    console.log('error', error);
                })
                .finally(() => {
                    navigate('/home');
                });
        }
    };

    return (
        <S.NewBoardContainer>
            {pathName === '/postUpload' ? (
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
                    <S.SubmitButtonBox>
                        <GradientButton
                            type="submit"
                            children={'올리기'}
                            gra={'true'}
                            width={'70px'}
                            padding={'10px'}
                        />
                    </S.SubmitButtonBox>
                </form>
            ) : pathName.includes('/postEdit/') ? (
                <form onSubmit={submitPost}>
                    <PostUploadForm
                        productItems={productItems}
                        setProductItems={setProductItems}
                        setOffset={setOffset}
                        imageURL={postData.image}
                        setImageURL={setImageURL}
                        setImageFile={setImageFile}
                        deleteProduct={deleteProduct}
                    />
                    <S.NewBoardTextarea
                        value={postOriginData.deskoration.message}
                        maxLength="100"
                        placeholder="나의 데스크 셋업에 대해서 얘기해주세요."
                        onChange={handleMessageChange}
                    />
                    <S.TextareaCounterP>
                        {textArea.length}/100
                    </S.TextareaCounterP>
                    <S.SubmitButtonBox>
                        <GradientButton
                            type="submit"
                            children={'수정하기'}
                            gra={'true'}
                            width={'70px'}
                            padding={'10px'}
                        />
                    </S.SubmitButtonBox>
                </form> // EditForm은 게시물 수정 화면을 렌더링하는 컴포넌트로 postId를 전달받아 사용 // 예: <EditForm postId={postId} /> // 여기에 수정 화면을 나타내는 코드를 추가
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
