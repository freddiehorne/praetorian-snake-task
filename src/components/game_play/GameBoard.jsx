import Snake from "./Snake";
import Food from "./Food";

const GameBoard = (props) => {
	const {
		appleCount,
		setAppleCount,
		snakeBlocks,
		setSnakeBlocks,
		direction,
		speed,
		setSpeed,
		foodPosition,
		setFoodPosition,
		gameStarted,
		onGameOver,
	} = props;

	return (
		<div className="gameBoard">
			{!gameStarted && (
				<h2>Use the arrow or W, A, S and D keys to control the snake</h2>
			)}
			<Snake
				appleCount={appleCount}
				setAppleCount={setAppleCount}
				snakeBlocks={snakeBlocks}
				setSnakeBlocks={setSnakeBlocks}
				foodPosition={foodPosition}
				setFoodPosition={setFoodPosition}
				direction={direction}
				speed={speed}
				setSpeed={setSpeed}
				gameStarted={gameStarted}
				onGameOver={onGameOver}
			/>
			<Food foodPosition={foodPosition} />
		</div>
	);
};

export default GameBoard;
