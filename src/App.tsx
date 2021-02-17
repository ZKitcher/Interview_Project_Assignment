import React, { useEffect, useState } from 'react';
import Searchbar from './component/homePage/Searchbar';
import WeatherList from './component/homePage/WeatherList';
import Status from './component/homePage/Status';
import PopUp from "./component/homePage/PopUp";
import { loadMapAPI } from './map/utils/GoogleMapUtils';
require('dotenv').config({ path: './../.env' });

let timer: ReturnType<typeof setTimeout> | null;

function App() {
    const defaultStatus: string = '';

    const [pulledList, setPulledList] = useState<Array<WeatherItemType>>([]);

    const [currentStatus, setCurrentStatus] = useState<string>(defaultStatus);

    const [popupState, setPopupState] = useState<boolean>(false);

    const [popupDetails, setPopupDetails] = useState<WeatherItemType>(pulledList[0]);

    const [expandedDetails, setExpandedDetails] = useState<string>("");

    const [isCurrentlyFetching, setIsCurrentlyFetching] = useState<boolean>(false);

    const [tempFormat, setTempFormat] = useState<boolean>(true);

    const [mapScriptLoaded, setMapScriptLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (currentStatus !== defaultStatus) {
            if (timer !== null) {
                clearTimeout(timer);
                timer = null;
            };
            timer = setTimeout(() => setCurrentStatus(defaultStatus), 2000);
        };
    }, [currentStatus]);

    useEffect(() => {
        setIsCurrentlyFetching(true)
        listCurrentPosition().then(res => {
            if (res.error === true) {
                setIsCurrentlyFetching(false);
                return;
            };
            const GeoAPIKey = process.env.REACT_APP_GEO_API_KEY;
            const url: string = `http://api.geonames.org/findNearbyPostalCodesJSON?lat=${res.latitude}&lng=${res.longitude}&username=${GeoAPIKey}`;

            fetch(url).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Unable to locate user ZIP.');
                };
            }).then((responseJson) => {
                const fetchResult: LonLatToPostal = responseJson;
                console.log(fetchResult);
                const ZIP: string = fetchResult.postalCodes[0].postalCode;
                addWeatherItem(ZIP);
            }).catch(err => {
                setCurrentStatus(`Unable to Locate User`);
            }).finally(() => {
                setIsCurrentlyFetching(false);
            });
        })
        function listCurrentPosition() {
            return new Promise<LocProp>(function (responseObj) {
                let coordinates: LocProp = {
                    latitude: 0,
                    longitude: 0,
                    error: true
                };
                navigator.geolocation.getCurrentPosition(
                    (success: GeolocationPosition) => {
                        coordinates.latitude = success.coords.latitude;
                        coordinates.longitude = success.coords.longitude;
                        coordinates.error = false;
                        responseObj(coordinates);
                    },
                    (error: GeolocationPositionError) => {
                        responseObj(coordinates);
                    });
            });
        }

        const googleMapScript = loadMapAPI();
        googleMapScript.addEventListener('load', function() {
            setMapScriptLoaded(true)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const removeWeatherItem: removeWeatherItem = item => {
        const newWeatherList = pulledList.filter(e => e.id !== item)
        setPulledList(newWeatherList);
        setCurrentStatus('Removing');
    };

    const showPopup: showPopup = item => {
        const detailed = pulledList.filter(e => e.id === item);
        setPopupDetails(detailed[0]);
        setPopupState(true);
    };

    const closePopup = () => {
        setPopupState(false);
    };

    async function addWeatherItem(newItem: string) {
        if (isCurrentlyFetching) return;
        setIsCurrentlyFetching(true);
        if (pulledList.find(e => e.id === newItem)) {
            setCurrentStatus(`${newItem} already listed.`);
            setIsCurrentlyFetching(false);
            return;
        };
        const openweatherAPIKey = process.env.REACT_APP_OW_API_KEY;

        const url: string = `http://api.openweathermap.org/data/2.5/weather?zip=${newItem}&appid=${openweatherAPIKey}`;

        setCurrentStatus(`Fetching ${newItem}...`);

        fetch(url).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to locate ZIP.');
            };
        }).then((responseJson) => {
            const res: NewWeatherRes = responseJson
            let newRes: WeatherItemType = {
                id: newItem,
                current: res.weather[0].main,
                currentDesc: res.weather[0].description,
                city: res.name,
                country: res.sys.country,
                temp: res.main.temp,
                feelsLike: res.main.feels_like,
                humidity: res.main.humidity,
                wind: res.wind.speed,
                windDirection: res.wind.deg,
                icon: `http://openweathermap.org/img/wn/${res.weather[0].icon}.png`,
                lat: res.coord.lat,
                lon: res.coord.lon
            };
            setPulledList([...pulledList, newRes])
            setExpandedDetails(newRes.id)
        }).catch((error) => {
            console.log(error);
            setCurrentStatus(`Invalid Zip Code.`);
        }).finally(() => {
            setIsCurrentlyFetching(false);
        });
    };

    const clearList = () => {
        setPulledList([]);
    };

    const flipTemp = () => {
        setTempFormat(!tempFormat);
    };

    const changeSelectedExpanded: selectedExpandedItem = item => {
        const newWeatherList = pulledList.filter(e => e.id === item)
        setExpandedDetails(newWeatherList[0].id);
    };

    const popUpHTML: JSX.Element =
        <PopUp
            pointed={popupDetails}
            closePopup={closePopup}
            popupState={popupState}
            tempFormat={tempFormat}
        />

    return (
        <div className="App">
            {popupState ? popUpHTML : null}
            <Searchbar
                addWeatherItem={addWeatherItem}
                clearList={clearList}
                isCurrentlyFetching={isCurrentlyFetching}
            />
            <Status
                addWeatherItem={addWeatherItem}
                isCurrentlyFetching={isCurrentlyFetching}
                status={currentStatus}
            />
            <WeatherList
                flipTemp={flipTemp}
                pulledList={pulledList}
                removeWeatherItem={removeWeatherItem}
                showPopup={showPopup}
                tempFormat={tempFormat}
                title={"Current Weather"}
                changeSelectedExpanded={changeSelectedExpanded}
                ExpandedItem={expandedDetails}
                mapLoaded={mapScriptLoaded}
            />
        </div>
    );
}

export default App;
