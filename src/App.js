import { useState, useEffect } from "react";
import { getRandomCoordinates } from "./utils";
import { API_URL } from "./config";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import useInterval from "use-interval";
import Input from "./components/Input";
import Timer from "./components/Timer";
import Buttons from "./components/Buttons";
import GameBoard from "./components/GameBoard";
import ApiButton from "./components/ApiButton";
import Leaderboard from "./components/Leaderboard";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// class App extends Component {
// 	state = initialState;
// 	snakeMoveInterval;
// 	timerInterval;

// 	componentDidMount() {
// 		this.getResults();
// 	}

// 	getResults = async () => {
// 		try {
// 			const result = await axios.get(API_URL);
// 			this.setState({ leaderboardData: result.data });
// 		} catch (error) {
// 			console.log(error);
// 			alert("API is down");
// 		}
// 	};

// 	sendResult = () => {
// 		const { input, minutes, seconds } = this.state;
// 		try {
// 			axios.post(API_URL, {
// 				name: input,
// 				time: { minutes, seconds },
// 			});
// 			console.log("hi");
// 		} catch (error) {
// 			console.log(error);
// 			alert("API is down");
// 		}
// 	};

// 	runGame = () => {
// 		this.onSnakeMove();
// 		this.onCrashWithWall();
// 		this.checkIfEat();
// 		this.onCrashWithSelf();
// 	};

// 	startGame = () => {
// 		if (this.state.input.length > 2) {
// 			this.snakeMoveInterval = setInterval(this.runGame, this.state.speed);
// 			this.timerInterval = setInterval(() => {
// 				const { seconds, minutes } = this.state;
// 				this.setState({ seconds: seconds + 1 });
// 				if (seconds === 59) {
// 					this.setState({ minutes: minutes + 1 });
// 					this.setState({ seconds: 0 });
// 				}
// 			}, 1000);
// 			this.setState({ gameStarted: true });
// 		}
// 	};

// 	onInput = (e) => this.setState({ input: e.target.value });

// 	onArrowDown = (e) => {
// 		const { direction } = this.state;
// 		switch (e.key) {
// 			case "ArrowLeft":
// 				if (direction !== "RIGHT") {
// 					this.setState({ direction: "LEFT" });
// 				}
// 				break;
// 			case "ArrowRight":
// 				if (direction !== "LEFT") {
// 					this.setState({ direction: "RIGHT" });
// 				}
// 				break;
// 			case "ArrowUp":
// 				if (direction !== "DOWN") {
// 					this.setState({ direction: "UP" });
// 				}
// 				break;
// 			case "ArrowDown":
// 				if (direction !== "UP") {
// 					this.setState({ direction: "DOWN" });
// 				}
// 				break;
// 			default:
// 				return;
// 		}
// 	};

// 	onSnakeMove = () => {
// 		let blocks = [...this.state.snakeBlocks];
// 		let head = [...blocks[blocks.length - 1]];
// 		switch (this.state.direction) {
// 			case "LEFT":
// 				head = [head[0], head[1] - 1];
// 				break;
// 			case "RIGHT":
// 				head = [head[0], head[1] + 1];
// 				break;
// 			case "UP":
// 				head = [head[0] - 1, head[1]];
// 				break;
// 			case "DOWN":
// 				head = [head[0] + 1, head[1]];
// 				break;
// 			default:
// 				return;
// 		}
// 		blocks.push(head);
// 		blocks.shift();
// 		this.setState({ snakeBlocks: blocks });
// 	};

// 	snakeGrow = () => {
// 		let extraBlock = [...this.state.snakeBlocks];
// 		extraBlock.unshift([]);
// 		this.setState({ snakeBlocks: extraBlock });
// 	};

// 	increaseSnakeSpeed = () => {
// 		const { speed } = this.state;
// 		if (speed > 10) {
// 			clearInterval(this.snakeMoveInterval);
// 			this.setState({ speed: speed - 5 });
// 			this.snakeMoveInterval = setInterval(this.runGame, this.state.speed);
// 		}
// 	};

// 	checkIfEat = () => {
// 		const { foodPosition, snakeBlocks, appleCount } = this.state;
// 		let head = snakeBlocks[snakeBlocks.length - 1];
// 		if (head[0] === foodPosition[1] && head[1] === foodPosition[0]) {
// 			this.setState({ foodPosition: getRandomCoordinates() });
// 			this.setState({ appleCount: appleCount + 1 });
// 			this.snakeGrow();
// 			this.increaseSnakeSpeed();
// 		}
// 	};

// 	onCrashWithWall = () => {
// 		let head = this.state.snakeBlocks[this.state.snakeBlocks.length - 1];
// 		if (head[0] < 0 || head[0] > 99 || head[1] < 0 || head[1] > 99) {
// 			this.onGameOver();
// 		}
// 	};

// 	onCrashWithSelf = () => {
// 		let snakeBody = [...this.state.snakeBlocks];
// 		let head = snakeBody[snakeBody.length - 1];
// 		snakeBody.pop();
// 		snakeBody.forEach((block) => {
// 			if (head[0] === block[0] && head[1] === block[1]) {
// 				this.onGameOver();
// 			}
// 		});
// 	};

// 	onGameOver = () => {
// 		const { input, minutes, seconds, appleCount } = this.state;
// 		toast.success(
// 			`Game Over ${input}! You lasted ${minutes} minutes and ${seconds} seconds and the snake ate ${appleCount} apples`,
// 			{
// 				position: "top-center",
// 				autoClose: 10000,
// 				hideProgressBar: false,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				progress: undefined,
// 			}
// 		);
// 		this.setState(initialState);
// 		clearInterval(this.snakeMoveInterval);
// 		clearInterval(this.timerInterval);
// 		this.sendResult();
// 	};

// 	goToLeaderboard = () => this.setState({ screen: 1 });

// 	backToGame = () => this.setState({ screen: 0 });

// 	render() {
// 		return (
// 			<>
// 				{this.state.screen === 0 && (
// 					<div className="main" onKeyDown={this.onArrowDown} tabIndex="0">
// 						<ApiButton goToLeaderboard={this.goToLeaderboard} />
// 						<h1>Welcome, enter your name and click Start</h1>
// 						<div className="topContainer">
// 							<div>
// 								<div className="buttons">
// 									<StartButton startGame={this.startGame} />
// 									<StopButton stopGame={this.onGameOver} />
// 								</div>
// 								<Input onInput={this.onInput} />
// 							</div>
// 							<Timer
// 								minutes={this.state.minutes}
// 								seconds={this.state.seconds}
// 							/>
// 							<h2>Apples: {this.state.appleCount}</h2>
// 						</div>

// 						<GameBoard
// 							snakeBlocks={this.state.snakeBlocks}
// 							foodPosition={this.state.foodPosition}
// 							gameStarted={this.state.gameStarted}
// 						/>
// 						<ToastContainer
// 							position="top-center"
// 							autoClose={8000}
// 							hideProgressBar={false}
// 							newestOnTop={false}
// 							closeOnClick
// 							rtl={false}
// 							pauseOnFocusLoss
// 							draggable
// 							pauseOnHover
// 						/>
// 					</div>
// 				)}
// 				{this.state.screen === 1 && (
// 					<Leaderboard
// 						backToGame={this.backToGame}
// 						leaderboardData={this.state.leaderboardData}
// 					/>
// 				)}
// 			</>
// 		);
// 	}
// }

// export default App;

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
				if (direction !== "RIGHT") {
					setDirection("LEFT");
				}
				break;
			case "ArrowRight":
				if (direction !== "LEFT") {
					setDirection("RIGHT");
				}
				break;
			case "ArrowUp":
				if (direction !== "DOWN") {
					setDirection("UP");
				}
				break;
			case "ArrowDown":
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
		setDirection("Right");
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
			setSpeed(speed - 5);
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

	// useEffect(() => {
	// 	if (input.length > 1 && gameStarted === true) {
	// 		const snakeInterval = setInterval(() => {
	// 			onSnakeMove();
	// 			onCrashWithWall();
	// 			onCrashWithSelf();
	// 			checkIfEat();
	// 		}, speed);
	// 		return () => clearInterval(snakeInterval);
	// 	}
	// }, [snakeBlocks, gameStarted, foodPosition]);

	// useEffect(() => {
	// 	if (input.length > 1 && gameStarted === true) {
	// 		const timerInterval = setInterval(() => {
	// 			setSeconds(seconds + 1);
	// 			if (seconds === 59) {
	// 				setMinutes(minutes + 1);
	// 				setSeconds(0);
	// 			}
	// 		}, 1000);
	// 		return () => clearInterval(timerInterval);
	// 	}
	// }, [gameStarted, seconds, minutes]);

	useInterval(() => {
		if (gameStarted) {
			onSnakeMove();
			onCrashWithWall();
			onCrashWithSelf();
			checkIfEat();
		}
	}, speed);

	useInterval(() => {
		if (gameStarted) {
			setSeconds(seconds + 1);
			if (seconds === 59) {
				setMinutes(minutes + 1);
				setSeconds(0);
			}
		}
	}, 1000);

	const goToLeaderboard = () => setScreen(1);

	const backToGame = () => setScreen(0);

	return (
		<>
			{screen === 0 && (
				<div className="main" onKeyDown={onArrowDown} tabIndex="0">
					<ApiButton goToLeaderboard={goToLeaderboard} />
					<h1>Welcome, enter your name and click Start</h1>
					<div className="topContainer">
						<div>
							<div className="buttons">
								<Buttons startGame={startGame} endGame={endGame} />
							</div>
							<Input onInput={onInput} />
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
