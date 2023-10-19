import React from 'react';
import * as S from './NewBoard.styled';

const NewBoard = () => {
    return (
        <>
            {/* 헤더 컴포넌트 불러올 예정 */}
            <header
                className="header"
                style={{ width: '100%', height: '70px' }}
            >
                <h4 className="title">게시물 작성</h4>
            </header>
            <form>
                <input type="file" />
                <textarea></textarea>
                <button type="submit">올리기</button>
            </form>
        </>
    );
};

export default NewBoard;
