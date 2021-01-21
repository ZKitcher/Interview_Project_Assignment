import React, { useEffect, useState } from 'react';
import Searchbar from './component/Searchbar';
import WeatherList from './component/WeatherList';
import UseFetch from './component/fetchComponents/UseFetch';
import UseFetchGeocoding from './component/fetchComponents/UseFetchGeocoding';
import Status from './component/Status';
import PopUp from "./component/PopUp";
require('dotenv').config({ path: './../.env' })

let timer: ReturnType<typeof setTimeout> | null;

function App() {
	const defaultStatus: string = ""

	const [pulledList, setPulledList] = useState<Array<WeatherItemType>>([])

	const [currentStatus, setCurrentStatus] = useState<string>(defaultStatus)

	const [popupState, setPopupState] = useState<boolean>(false)

	const [popupDetails, setPopupDetails] = useState<popUpDetails>(pulledList[0])

	const [fetching, setFetching] = useState<boolean>(false)

	const [tempFormat, setTempFormat] = useState<boolean>(true)

	useEffect(() => {
		if (currentStatus !== defaultStatus) {
			if (timer !== null) {
				clearTimeout(timer);
				timer = null;
			}
			timer = setTimeout(() => setCurrentStatus(defaultStatus), 2000);
		}
	}, [currentStatus])

	useEffect(() => {
		setFetching(true)
		listCurrentPosition().then(res => {
			if (res.error === false) {
				const GeoAPIKey = process.env.REACT_APP_GEO_API_KEY
				const url: string = `http://api.geonames.org/findNearbyPostalCodesJSON?lat=${res.latitude}&lng=${res.longitude}&username=${GeoAPIKey}`

				const fetchResult: Promise<LonLatToPostal> = UseFetchGeocoding(url)
				fetchResult.then(data => {
					console.log(data)
					const ZIP: string = data.postalCodes[0].postalCode
					addWeatherItem(ZIP)
				}).catch(err => {
					setFetching(false)
				})
			} else {
				setFetching(false)
			}
		})
		function listCurrentPosition() {
			return new Promise<LocProp>(function (resolve) {
				let coordinates: LocProp = {
					latitude: 0,
					longitude: 0,
					error: true
				}
				navigator.geolocation.getCurrentPosition(
					(success: GeolocationPosition) => {
						coordinates.latitude = success.coords.latitude;
						coordinates.longitude = success.coords.longitude;
						coordinates.error = false;
						resolve(coordinates);
					},
					(error: GeolocationPositionError) => {
						resolve(coordinates);
					});
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	const removeWeatherItem: removeWeatherItem = item => {
		const newWeatherList = pulledList.filter(e => e.id !== item)
		setPulledList(newWeatherList)
		setCurrentStatus("Removing");
	}

	const showPopup: showPopup = item => {
		const detailed = pulledList.filter(e => e.id === item)
		setPopupDetails(detailed[0])
		setPopupState(true)
	}

	const closePopup = () => {
		setPopupState(false)
	}

	async function addWeatherItem(newItem: string) {
		if (!fetching) {
			setFetching(true)
			if (pulledList.find(e => e.id === newItem)) {
				setCurrentStatus(`${newItem} already listed.`)
				setFetching(false)
				return
			}
			const openweatherAPIKey = process.env.REACT_APP_OW_API_KEY

			const url: string = `http://api.openweathermap.org/data/2.5/weather?zip=${newItem}&appid=${openweatherAPIKey}`

			setCurrentStatus(`Fetching ${newItem}...`);

			const res: NewWeatherRes = await UseFetch(url)

			if (res.cod === 200) {
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
					icon: `http://openweathermap.org/img/wn/${res.weather[0].icon}.png`
				};
				setPulledList([...pulledList, newRes])
			} else {
				setCurrentStatus(`Invalid Zip Code.`);
			}
			setFetching(false)
		}
	}

	const clearList = () => {
		setPulledList([])
	}

	const flipTemp = () => {
		setTempFormat(!tempFormat)
	}

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
				fetching={fetching}
			/>
			<Status
				addWeatherItem={addWeatherItem}
				fetching={fetching}
				status={currentStatus}
			/>
			<WeatherList
				flipTemp={flipTemp}
				pulledList={pulledList}
				removeWeatherItem={removeWeatherItem}
				showPopup={showPopup}
				tempFormat={tempFormat}
				title={"Current Weather"}
			/>
		</div>
	);
}

export default App;