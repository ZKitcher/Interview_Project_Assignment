import React from 'react';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpandedView from './ExpandedView';
import DisplayTemp from './DisplayTemp';

interface WeatherItemProp {
    pulledList: Array<WeatherItemType>;
    title: string;
    removeWeatherItem: RemoveWeatherItem;
    showPopup: ShowPopup;
    tempFormat: boolean;
    flipTemp: VoidFunction;
    changeSelectedExpanded: SelectedExpandedItem;
    ExpandedItem: string;
    mapLoaded: boolean;
}

const AntSwitch = withStyles((theme: Theme) => createStyles({
    root: {
        width: 28,
        height: 14,
        padding: 0,
        display: 'flex',
        overflow: 'visible',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.common.white,
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
    },
    checked: {},
}))(Switch);

const WeatherList: React.FC<WeatherItemProp> = ({
    pulledList,
    title,
    removeWeatherItem,
    showPopup,
    tempFormat,
    flipTemp,
    changeSelectedExpanded,
    ExpandedItem,
    mapLoaded,
}) => {
    const selectedExpandedItem = pulledList.filter(e => e.id === ExpandedItem);

    return (
        <div className="content">
            <h2>{title}</h2>
            <Typography component="div">
                <Grid
                    alignItems="center"
                    container
                    component="label"
                    spacing={1}
                >
                    <Grid item>Celsius</Grid>
                    <Grid item>
                        <AntSwitch checked={tempFormat} onChange={flipTemp} />
                    </Grid>
                    <Grid item>Fahrenheit</Grid>
                </Grid>
            </Typography>
            <div className="item-holder">
                <div className="weather-list">
                    {pulledList.map(e => (
                        <div
                            className={e.id === ExpandedItem
                                ? 'selected-item weather-preview' : 'weather-preview'}
                            key={e.id}
                        >
                            <h2
                                className={e.id === ExpandedItem ? 'selected-heading' : ''}
                                onClick={() => changeSelectedExpanded(e.id)}
                                role="presentation"
                            >
                                {`${e.city}: ${e.id}`}
                            </h2>
                            <div className="button-block">
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    size="small"
                                    onClick={() => showPopup(e.id)}
                                >
                                    <span>Details</span>
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => removeWeatherItem(e.id)}
                                >
                                    <span>Remove</span>
                                </Button>
                            </div>
                            <div className="weather-info">
                                <h3>{e.current}</h3>
                                <img src={e.icon} alt="icon" className="img-icon" />
                                <p>{e.current}</p>
                                <p>
                                    <span>Current Temp:</span>
                                    <DisplayTemp temp={e.temp} format={tempFormat} />
                                    {' '}

                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedExpandedItem.length === 1
                    ? (
                        <ExpandedView
                            ExpandedItem={selectedExpandedItem[0]}
                            tempFormat={tempFormat}
                            mapLoaded={mapLoaded}
                        />
                    )
                    : null}
            </div>
        </div>
    );
};

export default WeatherList;
