import React, { ChangeEvent, FormEvent, useState } from 'react';

interface WeatherItemProp {
    addItem: addItem;
    clearList: removeItem;
    fetching: boolean;
};

const Searchbar: React.FC<WeatherItemProp> = ({ addItem, clearList, fetching }) => {

    const title:string = "Weather Service"

    const [ZIP, setZIP] = useState<string>("");

    const [searchState, setSearchState] = useState<boolean>(true)

    const setInputVal = (query: ChangeEvent<HTMLInputElement>) => {
        setZIP(query.target.value.replace(/[^0-9]/gi, ''))
        if(query.target.value.length === 5){
            setSearchState(false);
        }else{
            setSearchState(true);
        }
    }

    const handleSubmit = (query: FormEvent<HTMLButtonElement>) => {
        query.preventDefault();
        if(query.currentTarget.id === "search"){
            addItem(ZIP)
            setSearchState(true);
        }else{
            clearList([]);
        }
        setZIP("")
    }

    return (
        <nav className="searchbar">
            <h1>{title}</h1>
            <div className="search">
                <form className="weather-form">
                    <input type="text" value={ZIP} placeholder="ZIP Code" onChange={setInputVal}/>
                    <button id="search" onClick={handleSubmit} disabled={(searchState || fetching)}>Search ZIP</button>
                    <button id="clear" type="submit" onClick={handleSubmit}>Clear All</button>
                </form>
            </div>
        </nav>
    );
}

export default Searchbar;