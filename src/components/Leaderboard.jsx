import LeaderboardList from "./LeaderboardList";

const Leaderboard = (props) => {
	const { backToGame, leaderboardData } = props;
	return (
		<>
			<button onClick={backToGame}>Back to Game</button>
			<div className="title">
				<h2>Name</h2>
				<h2>Score</h2>
			</div>
			<LeaderboardList leaderboardData={leaderboardData} />
		</>
	);
};

export default Leaderboard;
