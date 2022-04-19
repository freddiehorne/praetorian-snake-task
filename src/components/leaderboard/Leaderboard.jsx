import Button from "../non_game_play/Button";
import LeaderboardList from "./LeaderboardList";

const Leaderboard = (props) => {
	const { backToGame, leaderboardData } = props;
	return (
		<>
			<Button name="Back to Game" action={backToGame} />
			<div className="title">
				<h2>Name</h2>
				<h2>Score</h2>
			</div>
			<LeaderboardList leaderboardData={leaderboardData} />
		</>
	);
};

export default Leaderboard;
