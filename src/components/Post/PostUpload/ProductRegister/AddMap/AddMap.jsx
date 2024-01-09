import React, { useEffect, useState } from 'react';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import {
    searchPlacesAPI,
    selectedPlacePositionAPI,
} from 'service/kakaoMap_service';

import * as S from './AddMap.styled';

const AddMap = ({ searchKeyword, selectedPlace, handleSelectedPlace }) => {
    const [map, setMap] = useState();
    const [places, setPlaces] = useState([]);
    const [markers, setMarkers] = useState([]);

    // 검색한 데이터 배열에 담기
    useEffect(() => {
        if (searchKeyword) {
            searchPlacesAPI(searchKeyword) //
                .then(data => {
                    const setData = data.map(item => ({
                        position: {
                            lat: item.y,
                            lng: item.x,
                        },
                        name: item.place_name,
                        address: item.road_address_name,
                        id: item.id,
                    }));
                    setPlaces(setData);
                    setMarkers(setData);
                })
                .catch(error => {
                    console.log('검색결과 없음');
                });
        } else {
            setPlaces([]);
            setMarkers([]);
        }
    }, [searchKeyword]);

    // 선택한 데이터 위치 재 설정
    useEffect(() => {
        selectedPlacePositionAPI(selectedPlace, map);
    }, [map, selectedPlace]);
    return (
        <>
            {selectedPlace ? (
                <>
                    <S.SelectedPlaceBox>
                        <button onClick={() => handleSelectedPlace(null)}>
                            <S.ListIcon /> 목록
                        </button>
                        <div>
                            <span>{selectedPlace.name}</span>
                            <address>{selectedPlace.address}</address>
                        </div>
                    </S.SelectedPlaceBox>
                    <Map // 로드뷰를 표시할 Container
                        center={{
                            lat: 37.566826,
                            lng: 126.9786567,
                        }}
                        style={{
                            width: '100%',
                            height: '300px',
                            marginBottom: '10px',
                        }}
                        level={3}
                        onCreate={setMap}
                    >
                        {markers.map(marker => (
                            <CustomOverlayMap
                                key={marker.id}
                                position={marker.position}
                            >
                                {selectedPlace.id === marker.id ? (
                                    <S.SelectedMapPinIcon
                                        onClick={() =>
                                            handleSelectedPlace(marker)
                                        }
                                    />
                                ) : (
                                    <S.MapPinIcon
                                        onClick={() =>
                                            handleSelectedPlace(marker)
                                        }
                                    />
                                )}
                            </CustomOverlayMap>
                        ))}
                    </Map>
                </>
            ) : (
                <div>
                    <ul>
                        {searchKeyword && places.length ? (
                            places.map(place => (
                                <S.PlaceItem
                                    onClick={() =>
                                        handleSelectedPlace({
                                            position: {
                                                lat: place.position.lat,
                                                lng: place.position.lng,
                                            },
                                            name: place.name,
                                            address: place.address,
                                            id: place.id,
                                        })
                                    }
                                    key={place.id}
                                >
                                    <span>{place.name}</span>
                                    <address>{place.address}</address>
                                </S.PlaceItem>
                            ))
                        ) : searchKeyword && !places.length ? (
                            <S.EmptyResultBox>
                                해당 장소를 찾을 수 없습니다.
                            </S.EmptyResultBox>
                        ) : (
                            <></>
                        )}
                    </ul>
                </div>
            )}
        </>
    );
};

export default AddMap;
