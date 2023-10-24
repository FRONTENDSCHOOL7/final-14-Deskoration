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
    const [clickedBtn, setClickedBtn] = useState('');

    const handleHover = (btnName, state) => {
        setHover(prev => ({
            ...prev,
            [btnName]: state,
        }));
    };

    const handleClick = event => {
        setClickedBtn(event.currentTarget.name);
    };

    return (
        <S.Footer>
            <HomeBtn
                hover={hover.home}
                handleHover={state => handleHover('home', state)}
                handleClick={handleClick}
                clicked={clickedBtn === 'home'}
            />
            <BrowseBtn
                hover={hover.browse}
                handleHover={state => handleHover('browse', state)}
                handleClick={handleClick}
                clicked={clickedBtn === 'browse'}
            />
            <AddBtn
                hover={hover.add}
                handleHover={state => handleHover('add', state)}
                handleClick={handleClick}
                clicked={clickedBtn === 'add'}
            />
            <ChatBtn
                hover={hover.chat}
                handleHover={state => handleHover('chat', state)}
                handleClick={handleClick}
                clicked={clickedBtn === 'chat'}
            />
            <UserBtn
                hover={hover.user}
                handleHover={state => handleHover('user', state)}
                handleClick={handleClick}
                clicked={clickedBtn === 'user'}
            />
        </S.Footer>
    );
};

export default Footer;
