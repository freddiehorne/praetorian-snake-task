import Button from "./non_game_play/Button";
import Input from "./non_game_play/Input";
import Timer from "./non_game_play/Timer";
import GameBoard from "./game_play/GameBoard";
import { ToastContainer } from "react-toastify";

const Game = (props) => {
	const {
		onKeyDown,
		goToLeaderboard,
		startGame,
		endGame,
		onInput,
		input,
		minutes,
		seconds,
		appleCount,
		snakeBlocks,
		foodPosition,
		gameStarted,
	} = props;
	return (
		<>
			<div className="main" onKeyDown={onKeyDown} tabIndex="0">
				<Button name="Go to Leaderboard" action={goToLeaderboard} />
				<h1>Welcome, enter your name and click Start</h1>
				<div className="topContainer">
					<div>
						<div className="buttons">
							<Button name="Start" action={startGame} />
							<Button name="Stop" action={endGame} />
						</div>
						<Input onInput={onInput} input={input} />
					</div>
					<Timer minutes={minutes} seconds={seconds} />
					<h2>Apples: {appleCount}</h2>
				</div>

				<GameBoard
					snakeBlocks={snakeBlocks}
					foodPosition={foodPosition}
					gameStarted={gameStarted}
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
