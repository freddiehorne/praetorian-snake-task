import LeaderboardList from "./LeaderboardList";

const Leaderboard = (props) => {
	return (
		<>
			<button onClick={props.backToGame}>Back to Game</button>
			<h2>Name</h2>
			<h2>Score</h2>
			<LeaderboardList leaderboardData={props.leaderboardData} />
		</>
	);
};

export default Leaderboard;
