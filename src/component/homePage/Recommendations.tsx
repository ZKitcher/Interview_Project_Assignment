import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import USZip from '../../zipData/USZipCodes';

const useStyles = makeStyles((theme: Theme) => createStyles({
    margin: {
        margin: theme.spacing(1),
    },
}));

interface ZIPRecommendations {
    addWeatherItem: AddWeatherItem;
    isCurrentlyFetching: boolean;
}

const USLength = USZip.length;

const randomZip = () => USZip[Math.floor(Math.random() * USLength)];

const Recommendations: React.FC<ZIPRecommendations> = ({ addWeatherItem, isCurrentlyFetching }) => {
    const classes = useStyles();

    const [recommendations, setRecommendations] = useState([randomZip(), randomZip(), randomZip()]);

    return (
        <div style={{ display: 'inline-flex' }}>
            <span className="recommend-bar-span">Zip Codes:</span>
            {recommendations.map(e => (
                <Button
                    className={classes.margin}
                    color="secondary"
                    disabled={isCurrentlyFetching}
                    key={e}
                    size="medium"
                    variant="outlined"
                    onClick={() => {
                        addWeatherItem(e);
                        const tempRec = recommendations;
                        tempRec[tempRec.indexOf(e)] = randomZip();
                        setRecommendations(tempRec);
                    }}
                >
                    {e}
                </Button>
            ))}
        </div>
    );
};

export default Recommendations;
