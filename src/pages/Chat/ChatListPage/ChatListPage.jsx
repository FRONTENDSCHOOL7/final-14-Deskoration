import React from 'react';
import * as S from './ChatListPage.styled';

const ChatListPage = () => {
    return (
        <>
            <S.ChatListPageContainer>
                <S.ChatlistPageDiv>
                    <S.StyledSearchIcon />
                    <S.SearchUsernameInput
                        type="text"
                        placeholder="Search user"
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </S.ChatlistPageDiv>
            </S.ChatListPageContainer>
        </>
    );
};

export default ChatListPage;
