const { kakao } = window;

export const searchPlaces = async searchKeyword => {
    const ps = new kakao.maps.services.Places();

    return new Promise(resolve => {
        ps.keywordSearch(searchKeyword, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                return resolve(data);
            }
            // else {
            //     // console.error('Error in keyword search:', status);
            //     return resolve(null);
            // }
        });
    });
};

export const selectedPlacePosition = async (selectedPlace, map) => {
    const bounds = new kakao.maps.LatLngBounds();
    if (selectedPlace) {
        bounds.extend(
            new kakao.maps.LatLng(
                selectedPlace.position.lat,
                selectedPlace.position.lng,
            ),
        );
        map?.setBounds(bounds);
    }
};
