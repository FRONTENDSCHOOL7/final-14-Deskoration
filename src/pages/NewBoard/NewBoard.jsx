import React, { useRef } from 'react';
import * as S from './NewBoard.styled';

const NewBoard = () => {
    const hiddenFileInput = useRef(null);

    const handleInputClick = event => {
        event.preventDefault();
        hiddenFileInput.current.click();
    };
    const handleFileChange = event => {
        const fileUploaded = event.target.files[0];
        console.log(fileUploaded);
    };
    return (
        <>
            {/* 헤더 컴포넌트 불러올 예정 */}
            <header
                className="header"
                style={{
                    width: '100%',
                    height: '70px',
                }}
            >
                <h4 className="title">게시물 작성</h4>
            </header>
            <form>
                <button type="button" onClick={handleInputClick}>
                    사진 추가
                </button>
                <input
                    type="file"
                    onChange={handleFileChange}
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                />
                <textarea></textarea>
                <button type="submit">올리기</button>
            </form>
        </>
    );
};

export default NewBoard;
