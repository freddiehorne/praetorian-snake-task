const Timer = (props) => {
	const { minutes, seconds } = props;
	return (
		<h2>
			{minutes < 10 ? "0" + minutes : minutes}:{" "}
			{seconds < 10 ? "0" + seconds : seconds}
		</h2>
	);
};

export default Timer;
