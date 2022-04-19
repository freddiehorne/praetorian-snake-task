export const getRandomCoordinates = () => {
	let min = 1;
	let max = 98;
	let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	return [x, y];
};

// export const initialState = {
// 	snakeBlocks: [
// 		[25, 30],
// 		[25, 31],
// 	],
// 	foodPosition: getRandomCoordinates(),
// 	direction: "RIGHT",
// 	input: "",
// 	minutes: 0,
// 	seconds: 0,
// 	screen: 0,
// 	appleCount: 0,
// 	speed: 150,
// 	gameStarted: false,
// };
