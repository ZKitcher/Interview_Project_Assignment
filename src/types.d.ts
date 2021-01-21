type WeatherItemType = {
	id: string,
	current: string,
	currentDesc: string,
	city: string,
	country: string,
	temp: number,
	feelsLike: number,
	humidity: number,
	wind: number,
	windDirection: number,
	icon: string
}

interface popUpDetails {
	id: string,
	current: string,
	currentDesc: string,
	city: string,
	country: string,
	temp: number,
	feelsLike: number,
	humidity: number,
	wind: number,
	windDirection: number,
	icon: string
}

interface LocProp {
	latitude: number,
	longitude: number,
	error: boolean,
}

type removeWeatherItem = (removeWeatherItem: string) => void;

type showPopup = (showPopup: string) => void;

type addWeatherItem = (addWeatherItem: string) => Promise<void>;

type updateStatus = (updateStatus: string) => void;

type NewWeatherRes = {
	coord: Coord;
	weather: (WeatherEntity)[];
	base: string;
	main: Main;
	visibility: number;
	wind: Wind;
	clouds: Clouds;
	dt: number;
	sys: Sys;
	timezone: number;
	id: number;
	name: string;
	cod: number;
}
type Coord = {
	lon: number;
	lat: number;
}
type WeatherEntity = {
	id: number;
	main: string;
	description: string;
	icon: string;
}
type Main = {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
}
type Wind = {
	speed: number;
	deg: number;
}
type Clouds = {
	all: number;
}
type Sys = {
	type: number;
	id: number;
	country: string;
	sunrise: number;
	sunset: number;
}

type GeoLocItem = {
	coords: Coords;
	timestamp: number;
}
type Coords = {
	accuracy: number;
	altitude?: null;
	altitudeAccuracy?: null;
	heading?: null;
	latitude: number;
	longitude: number;
	speed?: null;
}


type LonLatToPostal = {
	postalCodes: (PostalCodesEntity)[];
}

type PostalCodesEntity = {
	adminCode2: string;
	adminCode3: string;
	adminName3: string;
	adminCode1: string;
	adminName2: string;
	lng: number;
	distance: string;
	countryCode: string;
	postalCode: string;
	adminName1: string;
	placeName: string;
	lat: number;
}
