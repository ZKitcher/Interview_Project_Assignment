import DisplayTemp from "./DisplayTemp";

interface WeatherItemProp {
    pulledList: Array<WeatherItemType>;
    title:string;
    removeItem: removeItem;
    showDetailed: showDetailed;
    tempFormat: boolean;
    flipTemp: flipTemp;
};

const WeatherList: React.FC<WeatherItemProp> = ({ pulledList, title , removeItem, showDetailed, tempFormat, flipTemp }) => {

    return (
        <div className="weather-list">
            <h2>{ title }</h2>
            <button className="clickable" onClick={() => flipTemp(tempFormat)}>{tempFormat ? "Fahrenheit" : "Celsius"}</button>
            {pulledList.map((e) => (
                <div className="weather-preview" key={e.id}>
                    <div className="button-block">
                        <button onClick={() => showDetailed(e.id)}>Details</button>
                        <button onClick={() => removeItem(e.id)}>Remove</button>
                    </div>
                    <h2>{`${e.city}: ${e.id}`}</h2>
                    <div className="weather-info">
                        <h3>{e.current}</h3>
                        <img src={e.icon} alt="icon" className="img-icon"/>
                        <p>{e.current}</p>
                        <p>Current Temp: {<DisplayTemp temp={e.temp} format={tempFormat}/>} </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WeatherList ;