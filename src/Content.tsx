import WeatherList from './WeatherList';

interface WeatherItemProp {
    pulledList: Array<WeatherItemType>;
    title:string;
    removeItem: removeItem;
    showDetailed: showDetailed;
    tempFormat: boolean;
    flipTemp: flipTemp;
};

const Content: React.FC<WeatherItemProp> = ({ pulledList, title , removeItem, showDetailed, tempFormat, flipTemp }) => {
    return ( 
        <div className="content">
            <WeatherList pulledList={pulledList} title={title} removeItem={removeItem} showDetailed={showDetailed} tempFormat={tempFormat} flipTemp={flipTemp}/>
        </div>
    );
}
 
export default Content; 