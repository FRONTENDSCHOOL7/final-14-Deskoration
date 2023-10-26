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

    const [active, setActive] = useState('home');

    return (
        <S.Footer>
            <S.FooterUl>
                <li>
                    <HomeBtn
                        hover={hover}
                        setHover={setHover}
                        active={active}
                        setActive={setActive}
                    />
                </li>
                <li>
                    <FeedBtn
                        hover={hover}
                        setHover={setHover}
                        active={active}
                        setActive={setActive}
                    />
                </li>
                <li>
                    <AddBtn
                        hover={hover}
                        setHover={setHover}
                        active={active}
                        setActive={setActive}
                    />
                </li>
                <li>
                    <ChatBtn
                        hover={hover}
                        setHover={setHover}
                        active={active}
                        setActive={setActive}
                    />
                </li>
                <li>
                    <UserBtn
                        hover={hover}
                        setHover={setHover}
                        active={active}
                        setActive={setActive}
                    />
                </li>
            </S.FooterUl>
        </S.Footer>
    );
};

export default Footer;
