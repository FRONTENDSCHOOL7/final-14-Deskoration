import React from 'react';
import * as S from './WarningMsg.styled';

// 메세지를 prop으로 전달해주세요
export const WarningMsg = ({ msg }) => {
    return <S.Warning>{msg}</S.Warning>;
};
