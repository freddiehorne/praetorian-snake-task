import useInterval from "use-interval";
import { getRandomCoordinates } from "../../utils";

const Snake = (props) => {
	const {
		appleCount,
		setAppleCount,
		snakeBlocks,
		setSnakeBlocks,
		direction,
		gameStarted,
		speed,
		setSpeed,
		onGameOver,
		foodPosition,
		setFoodPosition,
	} = props;

	const onSnakeMove = () => {
		let blocks = [...snakeBlocks];
		let head = [...blocks[blocks.length - 1]];
		switch (direction) {
			case "LEFT":
				head = [head[0], head[1] - 1];
				break;
			case "RIGHT":
				head = [head[0], head[1] + 1];
				break;
			case "UP":
				head = [head[0] - 1, head[1]];
				break;
			case "DOWN":
				head = [head[0] + 1, head[1]];
				break;
			default:
				return;
		}
		blocks.push(head);
		blocks.shift();
		setSnakeBlocks(blocks);
	};

	const onCrashWithWall = () => {
		let head = snakeBlocks[snakeBlocks.length - 1];
		if (head[0] < 0 || head[0] > 99 || head[1] < 0 || head[1] > 99) {
			onGameOver();
		}
	};

	const onCrashWithSelf = () => {
		let snakeBody = [...snakeBlocks];
		let head = snakeBody[snakeBody.length - 1];
		snakeBody.pop();
		snakeBody.forEach((block) => {
			if (head[0] === block[0] && head[1] === block[1]) {
				onGameOver();
			}
		});
	};

	const snakeGrow = () => {
		let extraBlock = [...snakeBlocks];
		extraBlock.unshift([]);
		setSnakeBlocks(extraBlock);
	};

	const checkIfEat = () => {
		let head = snakeBlocks[snakeBlocks.length - 1];
		if (head[0] === foodPosition[1] && head[1] === foodPosition[0]) {
			setFoodPosition(getRandomCoordinates());
			setAppleCount(appleCount + 1);
			snakeGrow();
			if (speed > 5) {
				setSpeed(speed - 5);
			}
		}
	};

	useInterval(() => {
		if (gameStarted) {
			onSnakeMove();
			onCrashWithWall();
			onCrashWithSelf();
			checkIfEat();
		}
	}, speed);

	return (
		<div>
			{snakeBlocks.map((block, i) => {
				const style = {
					top: `${block[0]}%`,
					left: `${block[1]}%`,
				};
				return <div className="snake" key={i} style={style}></div>;
			})}
		</div>
	);
};

export default Snake;
