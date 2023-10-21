import React, { useState } from 'react';
import { RegisterForm } from './RegisterForm';
import * as S from './NewBoard.styled';

const NewBoard = () => {
    const [isClicked, setIsClicked] = useState(false);

    const onRegister = () => {
        setIsClicked(true);
    };

    return (
        <>
            <header
                className="header"
                style={{ width: '100%', height: '70px' }}
            >
                <h4 className="title">사진선택</h4>
            </header>
            <article style={{ padding: '0 30px' }}>
                {!isClicked && (
                    <img
                        src={`${process.env.PUBLIC_URL}/images/dummyImg.jpg`}
                        style={{ width: '100%', display: 'block' }}
                        onClick={onRegister}
                        alt="사진"
                    />
                )}
                {isClicked && <RegisterForm />}
            </article>
        </>
    );
};

export default NewBoard;
