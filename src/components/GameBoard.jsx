import Food from "./Food";
import Snake from "./Snake";

const GameBoard = (props) => {
	return (
		<div className="gameBoard">
			<Snake snakePosition={props.snakePosition} />
			<Food foodPosition={props.foodPosition} />
		</div>
	);
};

export default GameBoard;
