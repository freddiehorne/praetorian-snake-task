import useInterval from "use-interval";

const Timer = (props) => {
	const { setMinutes, setSeconds, minutes, seconds, gameStarted } = props;
	useInterval(() => {
		if (gameStarted) {
			setSeconds(seconds + 1);
			if (seconds === 59) {
				setMinutes(minutes + 1);
				setSeconds(0);
			}
		}
	}, 1000);

	return (
		<h2>
			{minutes < 10 ? "0" + minutes : minutes}:{" "}
			{seconds < 10 ? "0" + seconds : seconds}
		</h2>
	);
};

export default Timer;
