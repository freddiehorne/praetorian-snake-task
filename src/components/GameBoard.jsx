import Food from "./Food";
import Snake from "./Snake";

const GameBoard = (props) => {
	return (
		<div className="gameBoard">
			{!props.gameStarted && <h2>Use the arrow keys to control the snake</h2>}
			<Snake snakeBlocks={props.snakeBlocks} />
			<Food foodPosition={props.foodPosition} />
		</div>
	);
};

export default GameBoard;
