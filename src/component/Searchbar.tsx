import React, { ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface SearchBarProp {
	addWeatherItem: addWeatherItem;
	clearList: VoidFunction;
	fetching: boolean;
};

const Searchbar: React.FC<SearchBarProp> = ({ addWeatherItem, clearList, fetching }) => {

	const title: string = "Weather Service"

	const [ZIP, setZIP] = useState<string>("");

	const [isSearchDisabled, setIsSearchDisabled] = useState<boolean>(true)

	const setInputVal = (query: ChangeEvent<HTMLInputElement>) => {
		const inputVal = query.target.value.replace(/[^0-9]/gi, '')
		setZIP(inputVal)
		if (inputVal.length === 5) {
			setIsSearchDisabled(false);
		} else {
			setIsSearchDisabled(true);
		}
	}

	const handleSearch = () => {
		console.log('test')
		addWeatherItem(ZIP)
		setIsSearchDisabled(true);
		setZIP("")
	}

	const handleClear = () => {
		clearList();
		setZIP("")
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !(isSearchDisabled || fetching)) {
			addWeatherItem(ZIP)
			setIsSearchDisabled(true);
			setZIP("")
		}
	}

	return (
		<nav className="searchbar">
			<h1>{title}</h1>
			<div className="search">
				<TextField
					id="standard-basic"
					label="ZIP Code"
					onChange={setInputVal}
					onKeyPress={handleKeyPress}
					type="text"
					value={ZIP}
				/>
				<Button
					color="secondary"
					disabled={(isSearchDisabled || fetching)}
					variant="contained"
					size="medium"
					onClick={handleSearch}
				>Search ZIP</Button>
				<Button
					variant="contained"
					size="medium"
					onClick={handleClear}
				>Clear All</Button>
			</div>
		</nav>
	);
}

export default Searchbar;