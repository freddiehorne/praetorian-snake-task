import GameOver from "./GameOver";
import Snake from "./Snake";

const GameBoard = (props) => {
	return (
		<div className="gameBoard">
			<Snake snakePosition={props.snakePosition} />
			{props.gameOver && <GameOver />}
		</div>
	);
};

export default GameBoard;
