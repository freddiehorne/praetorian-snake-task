const Buttons = (props) => {
	return (
		<>
			<button onClick={props.startGame}>Start</button>
			<button onClick={props.endGame}>Stop</button>
		</>
	);
};

export default Buttons;
