import Recommendations from "./Recommendations";

interface WeatherItemProp {
    status: string;
    addItem: addItem;
    fetching: boolean;
};

const Status: React.FC<WeatherItemProp> = ({ status, addItem, fetching }) => {
    return ( 
        <div className="recommend-bar">
            <Recommendations addItem={addItem} fetching={fetching}/>
            <div style={{float:"right"}}>
                <h3 className="status">{status}</h3>
            </div>
        </div>
    );
}

export default Status;