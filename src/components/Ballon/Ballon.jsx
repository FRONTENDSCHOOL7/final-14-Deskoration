import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './Ballon.styled';

const Ballon = ({ item, deleteItem }) => {
    // 내 글이 아니고, 수정중이 아니라면 삭제하기 안보이게
    const navigate = useNavigate();

    const temp = () => {
        navigate('/newboard', {
            state: { editItem: item },
        });
    };

    return (
        <S.Ballon $markerLocation={item.location}>
            <S.Product>
                <div onClick={temp}>{item.productName}</div>
                <div> {item.price}</div>
            </S.Product>
            <S.DeletItemButton
                type="button"
                onClick={() => deleteItem(item.id)}
            >
                <S.TrashIcon />
            </S.DeletItemButton>
        </S.Ballon>
    );
};

export default Ballon;
