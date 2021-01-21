import DisplayTemp from "./DisplayTemp";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

interface PopUpProp {
	pointed: popUpDetails;
	closePopup: VoidFunction;
	tempFormat: boolean;
	popupState: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	}),
);

const path = "M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z"

const PopUp: React.FC<PopUpProp> = ({ pointed, closePopup, tempFormat, popupState }) => {
	const classes = useStyles();

	const style = {
		transform: `rotate(${pointed.windDirection}deg)`,
		height: "1rem",
		marginLeft: "5px"
	}

	const currentWeather = pointed.currentDesc.charAt(0).toUpperCase() + pointed.currentDesc.slice(1)

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={popupState}
				onClose={closePopup}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={popupState}>
					<div className="modal_content">
						<Button variant="outlined" className="close" onClick={closePopup}>Close</Button>
						<h2>{`${pointed.city}: ${pointed.id}`}</h2>
						<div className="weather-info">
							<h3>{pointed.current}</h3>
							<img src={pointed.icon} alt="icon" className="img-icon" />
							<p>{`${pointed.current} - ${currentWeather}`}</p>
							<p>Current Temp: {<DisplayTemp temp={pointed.temp} format={tempFormat} />}</p>
							<p>Feels Like: {<DisplayTemp temp={pointed.feelsLike} format={tempFormat} />}</p>
							<p>Humidity: {pointed.humidity}%</p>
							<p>Wind: {pointed.wind}m/s. {translateDirection(pointed.windDirection)}
								<svg viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" style={style}>
									<g fill="#48484a">
										<path d={path}></path>
									</g>
								</svg>
							</p>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

const translateDirection = (wind: number): string => {
	const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
	return arr[(Math.floor((wind / 22.5) + 0.5) % 16)];
}

export default PopUp;