import React from 'react';
import DisplayTemp from './DisplayTemp';
import TranslateDirection from '../JSFunctions/TranslateDirection';
import Map from '../../map/Map';

interface ExpandedProp {
    ExpandedItem: WeatherItemType;
    tempFormat: boolean;
    mapLoaded: boolean;
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

const ExpandedView: React.FC<ExpandedProp> = ({ ExpandedItem, tempFormat, mapLoaded }) => {
    const style = {
        transform: `rotate(${ExpandedItem.windDirection}deg)`,
        height: '1rem',
        marginLeft: '5px',
    };

    const currentWeather = ExpandedItem.currentDesc.charAt(0).toUpperCase() + ExpandedItem.currentDesc.slice(1);

    const { lat } = ExpandedItem;
    const { lon } = ExpandedItem;

    return (
        <div className="expanded-view">
            <div className="expanded-content">
                <h2>{`${ExpandedItem.city}: ${ExpandedItem.id}`}</h2>
                <div className="weather-info">
                    <h3>{ExpandedItem.current}</h3>
                    <img src={ExpandedItem.icon} alt="icon" className="img-icon" />
                    <p>{`${ExpandedItem.current} - ${currentWeather}`}</p>
                    <p>
                        <span>Current Temp: </span>
                        <DisplayTemp temp={ExpandedItem.temp} format={tempFormat} />
                    </p>
                    <p>
                        <span>Feels Like: </span>
                        <DisplayTemp temp={ExpandedItem.feelsLike} format={tempFormat} />
                    </p>
                    <p>
                        <span>Humidity: </span>
                        {ExpandedItem.humidity}
                        <span>%</span>
                    </p>
                    <p>
                        <span>Wind: </span>
                        {ExpandedItem.wind}
                        <span>m/s. </span>
                        {TranslateDirection(ExpandedItem.windDirection)}
                        <svg viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" style={style}>
                            <g fill="#48484a">
                                <path d={path} />
                            </g>
                        </svg>
                    </p>
                </div>
                {mapLoaded && (
                    <Map
                        mapType={google.maps.MapTypeId.ROADMAP}
                        mapTypeControl
                        lat={lat}
                        lon={lon}
                    />
                )}
            </div>
        </div>
    );
};

export default ExpandedView;
