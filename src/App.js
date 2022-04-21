import { useState, useEffect } from "react";
import { getRandomCoordinates, getResults } from "./utils";
// import {sendResult } from "./utils";
import { toast } from "react-toastify";
import Game from "./components/Game";
import Leaderboard from "./components/leaderboard/Leaderboard";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

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

	useEffect(() => {
		getResults(setLeaderboardData);
	}, []);

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
		// sendResult(input, minutes, seconds, appleCount);
	};

	return (
		<>
			{screen === 0 && (
				<Game
					setScreen={setScreen}
					setInput={setInput}
					input={input}
					setMinutes={setMinutes}
					setSeconds={setSeconds}
					minutes={minutes}
					seconds={seconds}
					appleCount={appleCount}
					setAppleCount={setAppleCount}
					snakeBlocks={snakeBlocks}
					setSnakeBlocks={setSnakeBlocks}
					direction={direction}
					setDirection={setDirection}
					foodPosition={foodPosition}
					setFoodPosition={setFoodPosition}
					setGameStarted={setGameStarted}
					gameStarted={gameStarted}
					onGameOver={onGameOver}
					speed={speed}
					setSpeed={setSpeed}
				/>
			)}
			{screen === 1 && (
				<Leaderboard setScreen={setScreen} leaderboardData={leaderboardData} />
			)}
		</>
	);
};

export default App;
