import Recommendations from "./Recommendations";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

interface StatusProp {
    status: string;
    addWeatherItem: addWeatherItem;
    isCurrentlyFetching: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex-inline',
            textAlign: 'end',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
    }),
);

const Status: React.FC<StatusProp> = ({ status, addWeatherItem, isCurrentlyFetching }) => {
    const classes = useStyles();

    return (
        <div className="recommend-bar">
            <Recommendations addWeatherItem={addWeatherItem} isCurrentlyFetching={isCurrentlyFetching} />
            <div style={{ marginLeft: "auto", display: "flex" }}>
                <h3 className="status">{status}</h3>
                {isCurrentlyFetching ?
                    <div className={classes.root}>
                        <CircularProgress />
                    </div>
                    : null
                }
            </div>
        </div>
    );
}

export default Status;
