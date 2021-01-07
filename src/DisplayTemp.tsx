interface temp {
    temp: number;
    format: boolean
};

const DisplayTemp: React.FC<temp> = ({ temp, format }) => {
    return (
        <span>{ format ? Math.floor((temp - 273.15)*1.8)+32 :  Math.floor((temp - 273.15))} {format ? "°F" : "°C" }</span>
     );
}

export default DisplayTemp;