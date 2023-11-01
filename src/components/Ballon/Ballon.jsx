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

    const calcLeft = markerLocation => {
        if (markerLocation.x < 25) {
            return '0';
        } else if (markerLocation.x > 75) {
            return `calc(100% - 150px)`;
        } else {
            return `calc(${markerLocation.x}% - 75px)`; // 50% of the balloon width
        }
    };

    const calcTop = markerLocation => {
        return markerLocation.y > 48
            ? `calc(${markerLocation.y}% - 75px)` // Adjusted for balloon height
            : `calc(${markerLocation.y}% + 34px)`;
    };

    const calcArrowLeft = markerLocationX => {
        if (markerLocationX < 25) {
            return `${markerLocationX * 2}%`;
        } else if (markerLocationX > 75) {
            return `calc(50% + ${((markerLocationX - 75) / 25) * 50}%)`;
        } else {
            return '50%';
        }
    };

    return (
        <S.Ballon
            $markerLocation={item.location}
            style={{
                left: calcLeft(item.location),
                top: calcTop(item.location),
            }}
        >
            <S.Arrow
                isAbove={item.location.y > 48}
                style={{ left: calcArrowLeft(item.location.x) }}
            />
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
