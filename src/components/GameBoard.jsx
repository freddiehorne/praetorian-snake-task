import Snake from "./Snake";

const GameBoard = (props) => {
	return (
		<div className="gameBoard">
			<Snake snakePosition={props.snakePosition} />
		</div>
	);
};

export default GameBoard;
