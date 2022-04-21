import Snake from "./Snake";
import Food from "./Food";

const GameBoard = (props) => {
	const { snakeBlocks, foodPosition, gameStarted } = props;
	return (
		<div className="gameBoard">
			{!gameStarted && (
				<h2>Use the arrow or W, A, S and D keys to control the snake</h2>
			)}
			<Snake snakeBlocks={snakeBlocks} />
			<Food foodPosition={foodPosition} />
		</div>
	);
};

export default GameBoard;
