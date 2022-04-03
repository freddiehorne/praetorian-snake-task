import React, { Component } from "react";
import { initialState } from "./initialState";
// import { getApiData } from "./utils";
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
		this.getApiData();
	}

	getApiData = async () => {
		try {
			const result = await axios.get(
				"https://612e9e1ed11e5c001755865e.mockapi.io/api/v1/results"
			);
			this.setState({ leaderboardData: result.data });
			console.log(result.data);
		} catch (error) {
			console.log(error);
		}
	};

	componentDidUpdate() {
		this.onCrashWithWall();
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
		switch (e.key) {
			case "ArrowLeft":
				this.setState({ direction: "LEFT" });
				break;
			case "ArrowRight":
				this.setState({ direction: "RIGHT" });
				break;
			case "ArrowUp":
				this.setState({ direction: "UP" });
				break;
			case "ArrowDown":
				this.setState({ direction: "DOWN" });
				break;
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
		}
		this.setState({ snakePosition: snake });
	};

	onCrashWithWall = () => {
		let snake = this.state.snakePosition;
		if (snake[0] < 0 || snake[0] > 99 || snake[1] < 0 || snake[1] > 99) {
			this.onGameOver();
		}
	};

	onGameOver = () => {
		alert(
			`Game Over ${this.state.input}! You lasted ${this.state.minutes} minutes and ${this.state.seconds} seconds`
		);
		this.setState(initialState);
		clearInterval(snakeMoveInterval);
		clearInterval(timerInterval);
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
						<GameBoard snakePosition={this.state.snakePosition} />
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
