import React, { Component } from "react";
import { initialState, getRandomCoordinates } from "./utils";
import { API_URL } from "./config";
import axios from "axios";
import StartButton from "./components/StartButton";
import StopButton from "./components/StopButton";
import Input from "./components/Input";
import Timer from "./components/Timer";
import GameBoard from "./components/GameBoard";
import ApiButton from "./components/ApiButton";
import Leaderboard from "./components/Leaderboard";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let snakeMoveInterval;
let timerInterval;

class App extends Component {
	state = initialState;

	componentDidMount() {
		this.getResults();
	}

	getResults = async () => {
		try {
			const result = await axios.get(API_URL);
			this.setState({ leaderboardData: result.data });
		} catch (error) {
			console.log(error);
			alert("API is down");
		}
	};

	sendResult = async () => {
		const { input, minutes, seconds } = this.state;
		try {
			await axios.post(API_URL, {
				name: input,
				time: { minutes, seconds },
			});
		} catch (error) {
			console.log(error);
			alert("API is down");
		}
	};

	componentDidUpdate() {
		this.onCrashWithWall();
		this.checkIfEat();
		this.onCrashWithSelf();
	}

	startGame = () => {
		if (this.state.input.length > 2) {
			snakeMoveInterval = setInterval(this.onSnakeMove, this.state.speed);
			timerInterval = setInterval(() => {
				const { seconds, minutes } = this.state;
				this.setState({ seconds: seconds + 1 });
				if (seconds === 59) {
					this.setState({ minutes: minutes + 1 });
					this.setState({ seconds: 0 });
				}
			}, 1000);
		}
	};

	onInput = (e) => this.setState({ input: e.target.value });

	onArrowDown = (e) => {
		const { direction } = this.state;
		switch (e.key) {
			case "ArrowLeft":
				if (direction !== "RIGHT") {
					this.setState({ direction: "LEFT" });
				}
				break;
			case "ArrowRight":
				if (direction !== "LEFT") {
					this.setState({ direction: "RIGHT" });
				}
				break;
			case "ArrowUp":
				if (direction !== "DOWN") {
					this.setState({ direction: "UP" });
				}
				break;
			case "ArrowDown":
				if (direction !== "UP") {
					this.setState({ direction: "DOWN" });
				}
				break;
			default:
				return;
		}
	};

	onSnakeMove = () => {
		let blocks = [...this.state.snakeBlocks];
		let head = [...blocks[blocks.length - 1]];
		switch (this.state.direction) {
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
		this.setState({ snakeBlocks: blocks });
	};

	snakeGrow = () => {
		let extraBlock = [...this.state.snakeBlocks];
		extraBlock.unshift([]);
		this.setState({ snakeBlocks: extraBlock });
	};

	increaseSnakeSpeed = () => {
		const { speed } = this.state;
		if (speed > 10) {
			clearInterval(snakeMoveInterval);
			this.setState({ speed: speed - 5 });
			snakeMoveInterval = setInterval(this.onSnakeMove, this.state.speed);
		}
	};

	checkIfEat = () => {
		const { foodPosition, snakeBlocks, appleCount } = this.state;
		let head = snakeBlocks[snakeBlocks.length - 1];
		if (head[0] === foodPosition[1] && head[1] === foodPosition[0]) {
			this.setState({ foodPosition: getRandomCoordinates() });
			this.setState({ appleCount: appleCount + 1 });
			this.snakeGrow();
			this.increaseSnakeSpeed();
		}
	};

	onCrashWithWall = () => {
		let head = this.state.snakeBlocks[this.state.snakeBlocks.length - 1];
		if (head[0] < 0 || head[0] > 99 || head[1] < 0 || head[1] > 99) {
			this.onGameOver();
		}
	};

	onCrashWithSelf = () => {
		let snakeBody = [...this.state.snakeBlocks];
		let head = snakeBody[snakeBody.length - 1];
		snakeBody.pop();
		snakeBody.forEach((block) => {
			if (head[0] === block[0] && head[1] === block[1]) {
				this.onGameOver();
			}
		});
	};

	onGameOver = () => {
		const { input, minutes, seconds, appleCount } = this.state;
		toast.success(
			`Game Over ${input}! You lasted ${minutes} minutes and ${seconds} seconds and the snake ate ${appleCount} apples`,
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
		// alert(
		// 	`Game Over ${input}! You lasted ${minutes} minutes and ${seconds} seconds and the snake ate ${appleCount} apples`
		// );
		this.setState(initialState);
		clearInterval(snakeMoveInterval);
		clearInterval(timerInterval);
		// this.sendResult();
	};

	goToLeaderboard = () => this.setState({ screen: 1 });

	backToGame = () => this.setState({ screen: 0 });

	render() {
		return (
			<>
				{this.state.screen === 0 && (
					<div className="main" onKeyDown={this.onArrowDown} tabIndex="0">
						<ApiButton goToLeaderboard={this.goToLeaderboard} />
						<h1>Welcome, enter your name and click Start</h1>
						<div className="topContainer">
							<div>
								<div className="buttons">
									<StartButton startGame={this.startGame} />
									<StopButton stopGame={this.onGameOver} />
								</div>
								<Input onInput={this.onInput} />
							</div>
							<Timer
								minutes={this.state.minutes}
								seconds={this.state.seconds}
							/>
							<h2>Apples: {this.state.appleCount}</h2>
						</div>

						<GameBoard
							snakeBlocks={this.state.snakeBlocks}
							foodPosition={this.state.foodPosition}
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
				{this.state.screen === 1 && (
					<Leaderboard
						backToGame={this.backToGame}
						leaderboardData={this.state.leaderboardData}
					/>
				)}
			</>
		);
	}
}

export default App;
