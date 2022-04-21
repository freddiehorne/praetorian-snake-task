import { API_URL } from "./config";
import axios from "axios";

export const getRandomCoordinates = () => {
	let min = 1;
	let max = 98;
	let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	return [x, y];
};

export const getResults = async (setLeaderboardData) => {
	try {
		const result = await axios.get(API_URL);
		setLeaderboardData(result.data);
	} catch (error) {
		console.error(error);
		alert("API is down");
	}
};

// export const sendResult = (input, minutes, seconds, appleCount) => {
// 	try {
// 		axios.post(API_URL, {
// 			name: input,
// 			time: { minutes, seconds },
// 			applesEaten: appleCount,
// 		});
// 	} catch (error) {
// 		console.error(error);
// 	}
// };
