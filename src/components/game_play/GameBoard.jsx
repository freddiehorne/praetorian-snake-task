import Food from "./Food";
import Snake from "./Snake";

const GameBoard = (props) => {
	const { snakeBlocks, foodPosition } = props;
	return (
		<div className="gameBoard">
			{!props.gameStarted && <h2>Use the arrow keys to control the snake</h2>}
			<Snake snakeBlocks={snakeBlocks} />
			<Food foodPosition={foodPosition} />
		</div>
	);
};

export default GameBoard;
