import { useState } from "react";
import USZip from './USZipCodes'

interface WeatherItemProp {
    addItem: addItem;
    fetching: boolean;
};

const randomZip = () => {
    return USZip[Math.floor(Math.random() * USZip.length)]
}

const Recommendations: React.FC<WeatherItemProp> = ({ addItem, fetching }) => {

    const [recommendations, setRecommendations] = useState([randomZip(), randomZip(), randomZip()])

    return (
        <div style={{float:"left"}}>
            <span style={{marginRight: "5px"}}>Some Zip Codes:</span>
            {recommendations.map(e => (
                <button className="clickable" disabled={fetching} key={e} onClick={() => {
                    if(!fetching){
                        addItem(e)
                        recommendations[recommendations.indexOf(e)] = randomZip();
                        setRecommendations(recommendations)
                    }
                }}>{e}</button>
            ))}
        </div>
    );
}

export default Recommendations;