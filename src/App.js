import React, { Component } from "react";
import { initialState } from "./initialState";
import { getApiData } from "./utils";
import "./App.css";
import GameBoard from "./components/GameBoard";

class App extends Component {
	componentDidMount() {
		getApiData();
	}

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

	state = initialState;
	render() {
		return (
			<div onKeyDown={this.onArrowDown} tabindex="0">
				<GameBoard snakePosition={this.state.snakePosition} />
			</div>
		);
	}
}

export default App;
