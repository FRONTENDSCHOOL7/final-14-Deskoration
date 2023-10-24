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

    const handleHover = btnType => {
        if (btnType === 'home') {
            setHover(prev => ({
                ...prev,
                home: !hover,
            }));
        }
    };

    return (
        <S.Footer>
            <HomeBtn hover={hover} handleHover={() => handleHover('home')} />
            <BrowseBtn hover={hover} handleHover={handleHover} />
            <AddBtn hover={hover} handleHover={handleHover} />
            <ChatBtn hover={hover} handleHover={handleHover} />
            <UserBtn hover={hover} handleHover={handleHover} />
        </S.Footer>
    );
};

export default Footer;
