import React, { useState } from 'react';
import { RegisterForm } from './RegisterForm';
import { DragNDrop } from './DragNDrop';
import * as S from './NewBoard.styled';

const NewBoard = () => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const [data, setData] = useState({
        id: '',
        location: {},
        category: '',
        productName: '',
        price: '',
        store: '',
        link: '',
    });

    console.log(items);

    const dragNDropStyle = showRegisterForm ? { display: 'none' } : {};
    const registerFormStyle = showRegisterForm ? {} : { display: 'none' };

    return (
        <>
            <header
                className="header"
                style={{ width: '100%', height: '70px' }}
            >
                <h4 className="title">사진선택</h4>
            </header>
            <article style={{ padding: '0 25px' }}>
                <DragNDrop
                    displayStyle={dragNDropStyle}
                    setData={setData}
                    setOffset={setOffset}
                    items={items}
                    setItems={setItems}
                    onImageClick={() =>
                        items.length < 5
                            ? setShowRegisterForm(true)
                            : alert('상품은 최대 5개까지 추가할 수 있습니다.')
                    }
                />
                <RegisterForm
                    displayStyle={registerFormStyle}
                    setShowRegisterForm={setShowRegisterForm}
                    items={items}
                    setItems={setItems}
                    data={data}
                    setData={setData}
                    offset={offset}
                />
            </article>
        </>
    );
};

export default NewBoard;
