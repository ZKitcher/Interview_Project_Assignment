import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import Content from './Content';
import UseFetch from './useFetch';
import Status from './Status';
import PopUp from "./PopUp"; 

const initialItems: Array<WeatherItemType> = []

var timer:any;

function App() {

	const [pulledList, setPulledList] = useState(initialItems)

	const [currentStaus, setcurrentStaus] = useState<string>("...")

	const [popupState, setPopupState] = useState<boolean>(false)

	const [popupDetails, setPopupDetails] = useState(initialItems)

	const [fetching, setFetching] = useState<boolean>(false)

	const [tempFormat, setTempFormat] = useState<boolean>(false)

	useEffect(() => {
		if(currentStaus !== "..."){
			if (timer !== null) {
				clearTimeout(timer);
				timer = null;
			}
			timer = setTimeout(() => setcurrentStaus("..."), 2000);
		}
	},[currentStaus])

    const removeItem: removeItem = item => {
        const newWeatherList = pulledList.filter(e => e.id !== item)
		setPulledList(newWeatherList)
		setcurrentStaus("Removing");
    }

    const showDetailed: showDetailed = item =>{
		const detailed = pulledList.filter(e => e.id === item)
		setPopupDetails(detailed)
		setPopupState(true)
	}

	const closeDetailed: seenItem = () =>{
		setPopupState(false)
	}

	async function addItem(newItem:string) {
		if(!fetching){
			setFetching(true)
			if(pulledList.find(e => e.id === newItem)){
				setcurrentStaus(`${newItem} already listed.`)
				return
			}
			let url: string = `http://api.openweathermap.org/data/2.5/weather?zip=${newItem}&appid=e3c9f16387de80dc9369c6a1a122ee82`
			setcurrentStaus(`Fetching ${newItem}...`);
			let res:any = await UseFetch(url)
			if(res.cod === 200){
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
			}else{
				setcurrentStaus(`Invalid Zip Code.`);
			}
			setFetching(false)
		}
	}

	const clearList: removeItem = () =>{
		setPulledList([])
	}

	function flipTemp(current:boolean){
        setTempFormat(!current)
    }

  	return (
    	<div className="App">
			{popupState ? <PopUp pointed={popupDetails} closePopUp={closeDetailed} tempFormat={tempFormat}/> : null}
      		<Searchbar addItem={addItem} clearList={clearList} fetching={fetching}/>
			<Status status={currentStaus} addItem={addItem} fetching={fetching}/>
      		<Content pulledList={pulledList} title={"Current Weather"} removeItem={removeItem} showDetailed={showDetailed} tempFormat={tempFormat} flipTemp={flipTemp}/>
    	</div>
	);
}

export default App;
