interface tempProp {
    temp: number;
    format: boolean
};

const DisplayTemp: React.FC<tempProp> = ({ temp, format }) => {

    let temperature: number;
    if (format) {
        //F
        temperature = Math.floor((temp - 273.15) * 1.8) + 32;
    } else {
        //C
        temperature = Math.floor((temp - 273.15));
    }

    return (
        <span>{temperature} {format ? "°F" : "°C"}</span>
    );
};

export default DisplayTemp;
