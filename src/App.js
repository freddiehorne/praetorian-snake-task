import React, { Component } from "react";
import { initialState } from "./initialState";
import { getApiData } from "./utils";
import "./App.css";
import GameBoard from "./components/GameBoard";
import StartButton from "./components/StartButton";
import StopButton from "./components/StopButton";

let snakeMoveInterval;

class App extends Component {
	state = initialState;

	componentDidMount() {
		getApiData();
	}

	componentDidUpdate() {
		this.onCrashWithWall();
	}

	startGame = () => {
		snakeMoveInterval = setInterval(this.onSnakeMove, 50);
	};

	stopGame = () => {
		clearInterval(snakeMoveInterval);
		this.setState(initialState);
	};

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
		alert("Game Over");
		this.setState(initialState);
		clearInterval(snakeMoveInterval);
	};

	render() {
		return (
			<div onKeyDown={this.onArrowDown} tabIndex="0">
				<StartButton startGame={this.startGame} />
				<StopButton stopGame={this.stopGame} />
				<GameBoard snakePosition={this.state.snakePosition} />
			</div>
		);
	}
}

export default App;
