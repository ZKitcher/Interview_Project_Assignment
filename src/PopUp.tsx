import DisplayTemp from "./DisplayTemp";

interface WeatherItemProp {
    pointed: Array<WeatherItemType>;
    closePopUp: seenItem;
    tempFormat: boolean;
};

const path = "M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z"

const PopUp: React.FC<WeatherItemProp> = ({ pointed, closePopUp, tempFormat }) => {

    const e:WeatherItemType = pointed[0]

    const style = {
        transform: `rotate(${e.windDirection}deg)`,
        height: "1rem",
        marginLeft: "5px"
    }

    return ( 
        <div className="modal">
            <div className="modal_content">
                <button className="close" onClick={() => closePopUp(true)}>Close</button>
                <h2>{`${e.city}: ${e.id}`}</h2>
                <div className="weather-info">
                    <h3>{e.current}</h3>
                    <img src={e.icon} alt="icon" className="img-icon"/>
                    <p>{`${e.current} - ${e.currentDesc.charAt(0).toUpperCase() + e.currentDesc.slice(1)}`}</p>
                    <p>Current Temp: {<DisplayTemp temp={e.temp} format={tempFormat}/>}</p>
                    <p>Feels Like: {<DisplayTemp temp={e.feelsLike} format={tempFormat}/>}</p>
                    <p>Humidity: {e.humidity}%</p>
                    <p>Wind: {e.wind}m/s. {translateDirection(e.windDirection)}
                        <svg viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" style={style}>
                            <g fill="#48484a">
                                <path d={path}></path>
                            </g>
                        </svg>
                    </p>
                </div>
            </div>
        </div>
    );
}

const translateDirection = (wind: number): string => {
    const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(Math.floor((wind / 22.5) + 0.5) % 16)];
}

export default PopUp;