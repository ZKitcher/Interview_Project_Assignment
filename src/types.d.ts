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

type removeItem = (removeItem : WeatherItem) => void;

type seenItem = (seenItem : boolean) => void;

type showDetailed  = (showDetailed : WeatherItem) => void;

type addItem = (addItem: string) => void;

type updateStatus = (updateStatus: string) => void;

type flipTemp = (flipTemp : boolean) => void;
