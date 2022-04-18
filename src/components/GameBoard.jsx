import Food from "./Food";
import Snake from "./Snake";

const GameBoard = (props) => {
	return (
		<div className="gameBoard">
			<Snake snakeBlocks={props.snakeBlocks} />
			<Food foodPosition={props.foodPosition} />
		</div>
	);
};

export default GameBoard;
