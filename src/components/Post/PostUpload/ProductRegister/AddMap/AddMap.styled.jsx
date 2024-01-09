import styled from 'styled-components';
import theme from 'styles/theme';

import { ReactComponent as List } from 'assets/images/map/List.svg';
import { ReactComponent as MapPin } from 'assets/images/map/MapPin.svg';
import { ReactComponent as SelectedMapPin } from 'assets/images/map/SelectedMapPin.svg';

export const ListIcon = styled(List)`
    margin-bottom: 2px;
`;
export const SelectedMapPinIcon = styled(SelectedMapPin)``;
export const MapPinIcon = styled(MapPin)``;

export const PlaceItem = styled.li`
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid ${theme.border};

    cursor: pointer;

    span {
        display: inline-block;

        width: 290px;
        margin-bottom: 4px;

        font-size: 16px;
        font-family: 'PreBold';

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    address {
        width: 250px;

        color: ${theme.subFont};

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const EmptyResultBox = styled.div`
    margin-bottom: 10px;

    font-family: 'PreBold';
`;

export const SelectedPlaceBox = styled.div`
    display: flex;

    margin-bottom: 10px;
    button {
        display: flex;
        flex-direction: column;
        align-items: center;

        padding-right: 10px;

        color: ${theme.point};
        font-size: 12px;
    }
    div {
        padding-top: 2px;
        span {
            display: inline-block;

            margin-bottom: 4px;

            font-size: 16px;
            font-family: 'PreBold';
        }
        address {
            color: ${theme.subFont};
        }
    }
`;
