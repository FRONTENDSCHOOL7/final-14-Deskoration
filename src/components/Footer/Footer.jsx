import React, { useState } from 'react';
import * as S from './Footer.styled';
import { HomeBtn, BrowseBtn, AddBtn, ChatBtn, UserBtn } from './Buttons';

const Footer = () => {
    const [hover, setHover] = useState({
        home: false,
        browse: false,
        add: false,
        chat: false,
        user: false,
    });

    return (
        <S.Footer>
            <HomeBtn hover={hover} setHover={setHover} />
            <BrowseBtn hover={hover} setHover={setHover} />
            <AddBtn hover={hover} setHover={setHover} />
            <ChatBtn hover={hover} setHover={setHover} />
            <UserBtn hover={hover} setHover={setHover} />
        </S.Footer>
    );
};

export default Footer;
