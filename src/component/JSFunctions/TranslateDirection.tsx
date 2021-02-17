const TranslateDirection = (wind: number): string => {
    const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return arr[(Math.floor((wind / 22.5) + 0.5) % 16)];
};

export default TranslateDirection;
