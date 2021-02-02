import DisplayTemp from "./DisplayTemp";
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface WeatherItemProp {
    pulledList: Array<WeatherItemType>;
    title: string;
    removeWeatherItem: removeWeatherItem;
    showPopup: showPopup;
    tempFormat: boolean;
    flipTemp: VoidFunction;
};

const AntSwitch = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 28,
            height: 14,
            padding: 0,
            display: 'flex',
            overflow: 'visible'
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
    }),
)(Switch);

const WeatherList: React.FC<WeatherItemProp> = ({ pulledList, title, removeWeatherItem, showPopup, tempFormat, flipTemp }) => {

    return (
        <div className="content">
            <div className="weather-list">
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
                {pulledList.map((e) => (
                    <div className="weather-preview" key={e.id}>
                        <div className="button-block">
                            <Button
                                color="secondary"
                                variant="outlined"
                                size="small"
                                onClick={() => showPopup(e.id)}
                            >Details</Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => removeWeatherItem(e.id)}
                            >Remove</Button>
                        </div>
                        <h2>{`${e.city}: ${e.id}`}</h2>
                        <div className="weather-info">
                            <h3>{e.current}</h3>
                            <img src={e.icon} alt="icon" className="img-icon" />
                            <p>{e.current}</p>
                            <p>Current Temp: {<DisplayTemp temp={e.temp} format={tempFormat} />} </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherList;
