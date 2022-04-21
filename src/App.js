import { useState, useEffect } from "react";
import { getRandomCoordinates } from "./utils";
import { toast } from "react-toastify";
import { API_URL } from "./config";
import useInterval from "use-interval";
import axios from "axios";
import Leaderboard from "./components/leaderboard/Leaderboard";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Game from "./components/Game";

const App = () => {
	const [snakeBlocks, setSnakeBlocks] = useState([[25, 30]]);
	const [direction, setDirection] = useState("RIGHT");
	const [speed, setSpeed] = useState(150);
	const [foodPosition, setFoodPosition] = useState(getRandomCoordinates());
	const [input, setInput] = useState("");
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [appleCount, setAppleCount] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const [screen, setScreen] = useState(0);
	const [leaderboardData, setLeaderboardData] = useState();

	const getResults = async () => {
		try {
			const result = await axios.get(API_URL);
			setLeaderboardData(result.data);
		} catch (error) {
			console.error(error);
			alert("API is down");
		}
	};

	// const sendResult = () => {
	// 	try {
	// 		axios.post(API_URL, {
	// 			name: input,
	// 			time: { minutes, seconds },
	// 			applesEaten: appleCount,
	// 		});
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	useEffect(() => {
		getResults();
	}, []);

	const onInput = (e) => setInput(e.target.value);

	const startGame = () => {
		if (input.length > 1) {
			setGameStarted(true);
		}
	};

	const endGame = () => {
		if (gameStarted) {
			onGameOver();
		}
	};

	const onArrowDown = (e) => {
		switch (e.key) {
			case "ArrowLeft":
			case "a":
				if (direction !== "RIGHT") {
					setDirection("LEFT");
				}
				break;
			case "ArrowRight":
			case "d":
				if (direction !== "LEFT") {
					setDirection("RIGHT");
				}
				break;
			case "ArrowUp":
			case "w":
				if (direction !== "DOWN") {
					setDirection("UP");
				}
				break;
			case "ArrowDown":
			case "s":
				if (direction !== "UP") {
					setDirection("DOWN");
				}
				break;
			default:
				return;
		}
	};

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

	const resetGame = () => {
		setSnakeBlocks([[25, 30]]);
		setDirection("RIGHT");
		setSpeed(150);
		setFoodPosition(getRandomCoordinates());
		setInput("");
		setMinutes(0);
		setSeconds(0);
		setAppleCount(0);
		setGameStarted(false);
	};

	const onGameOver = () => {
		toast.success(
			appleCount === 1
				? `Game Over ${input}! You lasted ${minutes} minutes and ${seconds} seconds and the snake ate ${appleCount} apple`
				: `Game Over ${input}! You lasted ${minutes} minutes and ${seconds} seconds and the snake ate ${appleCount} apples`,
			{
				position: "top-center",
				autoClose: 10000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			}
		);
		resetGame();
		// sendResult();
	};

	const onCrashWithWall = () => {
		let head = snakeBlocks[snakeBlocks.length - 1];
		if (head[0] < 0 || head[0] > 99 || head[1] < 0 || head[1] > 99) {
			onGameOver();
		}
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

	const snakeGrow = () => {
		let extraBlock = [...snakeBlocks];
		extraBlock.unshift([]);
		setSnakeBlocks(extraBlock);
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

	useInterval(() => {
		if (gameStarted) {
			setSeconds(seconds + 1);
			if (seconds === 59) {
				setMinutes(minutes + 1);
				setSeconds(0);
			}
		}
	}, 1000);

	useInterval(() => {
		if (gameStarted) {
			onSnakeMove();
			onCrashWithWall();
			onCrashWithSelf();
			checkIfEat();
		}
	}, speed);

	const goToLeaderboard = () => setScreen(1);

	const backToGame = () => setScreen(0);

	return (
		<>
			{screen === 0 && (
				<Game
					onKeyDown={onArrowDown}
					goToLeaderboard={goToLeaderboard}
					startGame={startGame}
					endGame={endGame}
					onInput={onInput}
					input={input}
					minutes={minutes}
					seconds={seconds}
					appleCount={appleCount}
					snakeBlocks={snakeBlocks}
					foodPosition={foodPosition}
					gameStarted={gameStarted}
				/>
			)}
			{screen === 1 && (
				<Leaderboard
					backToGame={backToGame}
					leaderboardData={leaderboardData}
				/>
			)}
		</>
	);
};

export default App;
