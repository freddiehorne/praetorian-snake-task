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
	}

	startGame = () => {
		if (this.state.input.length > 2) {
			snakeMoveInterval = setInterval(this.onSnakeMove, 50);
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
		let snake = [...this.state.snakePosition];
		switch (this.state.direction) {
			case "LEFT":
				snake = [snake[0], snake[1] - 1];
				break;
			case "RIGHT":
				snake = [snake[0], snake[1] + 1];
				break;
			case "UP":
				snake = [snake[0] - 1, snake[1]];
				break;
			case "DOWN":
				snake = [snake[0] + 1, snake[1]];
				break;
			default:
				return;
		}
		this.setState({ snakePosition: snake });
	};

	checkIfEat = () => {
		const { foodPosition, snakePosition } = this.state;
		if (
			snakePosition[0] === foodPosition[1] &&
			snakePosition[1] === foodPosition[0]
		) {
			this.setState({ foodPosition: getRandomCoordinates() });
		}
	};

	onCrashWithWall = () => {
		let snake = this.state.snakePosition;
		if (snake[0] < 0 || snake[0] > 99 || snake[1] < 0 || snake[1] > 99) {
			this.onGameOver();
		}
	};

	onGameOver = () => {
		const { input, minutes, seconds } = this.state;
		alert(
			`Game Over ${input}! You lasted ${minutes} minutes and ${seconds} seconds`
		);
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
						</div>
						<GameBoard
							snakePosition={this.state.snakePosition}
							foodPosition={this.state.foodPosition}
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
