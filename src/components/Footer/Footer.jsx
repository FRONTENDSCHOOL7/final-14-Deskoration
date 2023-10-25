import React, { useState } from 'react';
import * as S from './Footer.styled';
import { HomeBtn, FeedBtn, AddBtn, ChatBtn, UserBtn } from './Buttons';

const Footer = () => {
    const [hover, setHover] = useState({
        home: false,
        feed: false,
        add: false,
        chat: false,
        user: false,
    });

    const [active, setActive] = useState(null);

    return (
        <S.Footer>
            <HomeBtn
                hover={hover}
                setHover={setHover}
                active={active}
                setActive={setActive}
            />
            <FeedBtn
                hover={hover}
                setHover={setHover}
                active={active}
                setActive={setActive}
            />
            <AddBtn
                hover={hover}
                setHover={setHover}
                active={active}
                setActive={setActive}
            />
            <ChatBtn
                hover={hover}
                setHover={setHover}
                active={active}
                setActive={setActive}
            />
            <UserBtn
                hover={hover}
                setHover={setHover}
                active={active}
                setActive={setActive}
            />
        </S.Footer>
    );
};

export default Footer;
