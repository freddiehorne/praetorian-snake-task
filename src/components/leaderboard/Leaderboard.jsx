import Button from "../non_game_play/Button";
import LeaderboardList from "./LeaderboardList";

const Leaderboard = (props) => {
	const { setScreen, leaderboardData } = props;
	const backToGame = () => setScreen(0);

	return { leaderboardData } ? (
		<>
			<Button name="Back to Game" action={backToGame} />
			<div className="title">
				<h2>Name</h2>
				<h2>Score</h2>
			</div>
			<LeaderboardList leaderboardData={leaderboardData} />
		</>
	) : (
		<>
			<h1>Waiting for results...</h1>
		</>
	);
};

export default Leaderboard;
