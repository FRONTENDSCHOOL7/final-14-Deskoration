import React, { useState } from 'react';
import * as S from './Footer.styled';
import usePageHandler from '../../hooks/usePageHandler';
import { HomeBtn, FeedBtn, AddBtn, ChatBtn, UserBtn } from './Buttons';
import { useDispatch } from 'react-redux';
import { setPage } from '../../features/page/pageSlice';

const Footer = () => {
    const [hover, setHover] = useState({
        home: false,
        feed: false,
        add: false,
        chat: false,
        user: false,
    });

    const [active, setActive] = useState('home');

    const dispatch = useDispatch();

    const handlePage = usePageHandler();

    return (
        <S.Footer>
            <S.FooterUl>
                <li>
                    <HomeBtn
                        hover={hover}
                        setHover={setHover}
                        active={active}
                        setActive={setActive}
                        handlePage={handlePage}
                    />
                </li>
                <li>
                    <FeedBtn
                        hover={hover}
                        setHover={setHover}
                        active={active}
                        setActive={setActive}
                        handlePage={handlePage}
                    />
                </li>
                <li>
                    <AddBtn
                        hover={hover}
                        setHover={setHover}
                        active={active}
                        setActive={setActive}
                        handlePage={handlePage}
                    />
                </li>
                <li>
                    <ChatBtn
                        hover={hover}
                        setHover={setHover}
                        active={active}
                        setActive={setActive}
                        handlePage={handlePage}
                    />
                </li>
                <li>
                    <UserBtn
                        hover={hover}
                        setHover={setHover}
                        active={active}
                        setActive={setActive}
                        handlePage={handlePage}
                    />
                </li>
            </S.FooterUl>
        </S.Footer>
    );
};

export default Footer;
