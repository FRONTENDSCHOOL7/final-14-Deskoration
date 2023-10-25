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
            <HomeBtn />
            <BrowseBtn />
            <AddBtn />
            <ChatBtn />
            <UserBtn />
        </S.Footer>
    );
};

export default Footer;
