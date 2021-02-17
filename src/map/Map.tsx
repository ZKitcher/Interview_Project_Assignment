import React, { useState, useEffect, useRef } from 'react';

interface IMap {
    mapType: google.maps.MapTypeId,
    mapTypeControl?: boolean,
    lat: number,
    lon: number
}

type GoogleLatLon = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const Map: React.FC<IMap> = ({
    mapType, mapTypeControl, lat, lon,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [map, setMap] = useState<GoogleMap>();

    const [currentLocation, setCurrentLocation] = useState<Array<number>>([lat, lon]);

    const initMap = (zoomLevel: number, address: GoogleLatLon): void => {
        if (ref.current) {
            setMap(
                new google.maps.Map(ref.current, {
                    zoom: zoomLevel,
                    center: address,
                    mapTypeControl,
                    streetViewControl: false,
                    zoomControl: true,
                    mapTypeId: mapType,
                }),
            );
        }
    };

    const defaultMapStart = (): void => {
        const defaultAddress = new google.maps.LatLng(lat, lon);
        initMap(10, defaultAddress);
    };

    const startMap = (): void => {
        if (!map) {
            defaultMapStart();
        }
    };

    useEffect(startMap, [map]);
    if (lat !== currentLocation[0] || lon !== currentLocation[1]) {
        setCurrentLocation([lat, lon]);
        initMap(10, new google.maps.LatLng(lat, lon));
    }

    return (
        <div className="map-container">
            <div ref={ref} className="map-container-map" />
        </div>
    );
};

export default Map;
