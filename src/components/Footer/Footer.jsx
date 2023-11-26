import React, { useEffect, useState } from 'react';
import * as S from './Footer.styled';

import { HomeBtn, FeedBtn, AddBtn, ChatBtn, UserBtn } from './Buttons';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const [hover, setHover] = useState({
        home: false,
        feed: false,
        add: false,
        chat: false,
        user: false,
    });

    const activeTab = path => {
        if (path === '/home') return 'home';
        if (path.includes('/feed')) return 'feed';
        if (path.includes('/postUpload')) return 'postUpload';
        if (path === '/chat') return 'chat';
        if (path.includes('/profile')) return 'profile';
        return '';
    };

    const [active, setActive] = useState(activeTab(location.pathname));

    useEffect(() => {
        setActive(activeTab(location.pathname));
    }, [location]);

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
