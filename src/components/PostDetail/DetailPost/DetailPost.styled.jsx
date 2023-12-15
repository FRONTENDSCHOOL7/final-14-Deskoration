import styled from 'styled-components';

import { ReactComponent as Back } from '../../../assets/images/Backward.svg';
import { ReactComponent as Dots_vertical } from '../../../assets/images/Dots_vertical.svg';

export const Dots_verticalIcon = styled(Dots_vertical)`
    width: 24px;
    height: 24px;
`;

export const DetailPostCotainer = styled.div`
    height: 100%;
`;

// 댓글창 헤더
export const DetailPostHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    margin: 0 25px;
`;

// 댓글 영역
export const DetailPostUser = styled.div`
    display: flex;
    align-items: center;
    /* gap: 5px; */

    div {
        font-weight: bold;
        font-size: 16px;
    }
`;

export const BackIcon = styled(Back)`
    vertical-align: top;
`;

export const DetailPostMain = styled.div`
    /* overflow-y: ${props => !props.$isBottomSheet && 'scroll'}; */

    padding-bottom: 10px;
`;

export const ContentSection = styled.section`
    margin-bottom: 10px;
    > div > img {
        width: 100%;
        margin-bottom: 10px;
        border-radius: 20px;
        border: 1px solid ${props => props.theme.border};
    }

    .user-name {
        font-size: 16px;
        font-family: 'PreBold';
        margin-bottom: 10px;
    }

    p {
        word-wrap: break-word;
    }
`;

export const ContentButtonBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const FollowBtnBox = styled.div`
    position: absolute;
    top: 15px;
    right: 25px;
`;

export const BottomSheetControlButton = styled.button``;
