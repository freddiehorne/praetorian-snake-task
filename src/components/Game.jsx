import Button from "./non_game_play/Button";
import Input from "./non_game_play/Input";
import Timer from "./non_game_play/Timer";
import GameBoard from "./game_play/GameBoard";
import { ToastContainer } from "react-toastify";

const Game = (props) => {
	const {
		setScreen,
		setInput,
		input,
		setMinutes,
		setSeconds,
		minutes,
		seconds,
		appleCount,
		setAppleCount,
		snakeBlocks,
		setSnakeBlocks,
		foodPosition,
		setFoodPosition,
		gameStarted,
		setGameStarted,
		onGameOver,
		speed,
		setSpeed,
		direction,
		setDirection,
	} = props;

	const goToLeaderboard = () => setScreen(1);

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

	return (
		<>
			<div className="main" onKeyDown={onArrowDown} tabIndex="0">
				<Button name="Go to Leaderboard" action={goToLeaderboard} />
				<h1>Welcome, enter your name and click Start</h1>
				<div className="topContainer">
					<div>
						<div className="buttons">
							<Button name="Start" action={startGame} />
							<Button name="Stop" action={endGame} />
						</div>
						<Input setInput={setInput} input={input} />
					</div>
					<Timer
						setMinutes={setMinutes}
						setSeconds={setSeconds}
						minutes={minutes}
						seconds={seconds}
						gameStarted={gameStarted}
					/>
					<h2>Apples: {appleCount}</h2>
				</div>

				<GameBoard
					snakeBlocks={snakeBlocks}
					setSnakeBlocks={setSnakeBlocks}
					direction={direction}
					speed={speed}
					setSpeed={setSpeed}
					gameStarted={gameStarted}
					foodPosition={foodPosition}
					setFoodPosition={setFoodPosition}
					onGameOver={onGameOver}
					appleCount={appleCount}
					setAppleCount={setAppleCount}
				/>
				<ToastContainer
					position="top-center"
					autoClose={8000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</div>
		</>
	);
};

export default Game;
