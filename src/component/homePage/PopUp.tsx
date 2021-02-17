import React from 'react';
import Button from '@material-ui/core/Button';
import DisplayTemp from './DisplayTemp';
import TranslateDirection from '../JSFunctions/TranslateDirection';

interface PopUpProp {
    pointed: WeatherItemType;
    closePopup: VoidFunction;
    tempFormat: boolean;
    popupState: boolean;
}

const path = `M510.5,
749.6c-14.9-9.9-38.1-9.9-53.1,
1.7l-262,
207.3c-14.9,
11.6-21.6,
6.6-14.9-11.6L474,
48.1c5-16.6,
14.9-18.2,
21.6,
0l325,
898.7c6.6,
16.6-1.7,
23.2-14.9,
11.6L510.5,
749.6z`;

const PopUp: React.FC<PopUpProp> = ({ pointed, closePopup, tempFormat }) => {
    const style = {
        transform: `rotate(${pointed.windDirection}deg)`,
        height: '1rem',
        marginLeft: '5px',
    };

    const currentWeather = pointed.currentDesc.charAt(0).toUpperCase() + pointed.currentDesc.slice(1);

    return (
        <div className="modal">
            <div className="modal_content">
                <Button variant="outlined" className="close" onClick={closePopup}>Close</Button>
                <h2>{`${pointed.city}: ${pointed.id}`}</h2>
                <div className="weather-info">
                    <h3>{pointed.current}</h3>
                    <img src={pointed.icon} alt="icon" className="img-icon" />
                    <p>{`${pointed.current} - ${currentWeather}`}</p>
                    <p>
                        <span>Current Temp: </span>
                        <DisplayTemp temp={pointed.temp} format={tempFormat} />
                    </p>
                    <p>
                        <span>Feels Like: </span>
                        <DisplayTemp temp={pointed.feelsLike} format={tempFormat} />
                    </p>
                    <p>
                        <span>Humidity: </span>
                        {pointed.humidity}
                        <span>%</span>
                    </p>
                    <p>
                        <span>Wind: </span>
                        {pointed.wind}
                        <span>m/s. </span>
                        {TranslateDirection(pointed.windDirection)}
                        <svg viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" style={style}>
                            <g fill="#48484a">
                                <path d={path} />
                            </g>
                        </svg>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
