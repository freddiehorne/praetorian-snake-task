import React, { Component } from "react";
import { initialState } from "./initialState";
import { getApiData } from "./utils";
import "./App.css";
import GameBoard from "./components/GameBoard";
import StartButton from "./components/StartButton";
import StopButton from "./components/StopButton";
import Input from "./components/Input";
import Timer from "./components/Timer";
import ApiButton from "./components/ApiButton";
import Leaderboard from "./components/Leaderboard";

let snakeMoveInterval;
let timerInterval;

class App extends Component {
	state = initialState;

	componentDidMount() {
		getApiData();
	}

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

	stopGame = () => {
		clearInterval(snakeMoveInterval);
		clearInterval(timerInterval);
		this.setState(initialState);
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
					<div onKeyDown={this.onArrowDown} tabIndex="0">
						<StartButton startGame={this.startGame} />
						<StopButton stopGame={this.stopGame} />
						<Input onInput={this.onInput} />
						<Timer minutes={this.state.minutes} seconds={this.state.seconds} />
						<GameBoard snakePosition={this.state.snakePosition} />
						<ApiButton goToLeaderboard={this.goToLeaderboard} />
					</div>
				)}
				{this.state.screen === 1 && (
					<Leaderboard backToGame={this.backToGame} />
				)}
			</>
		);
	}
}

export default App;
