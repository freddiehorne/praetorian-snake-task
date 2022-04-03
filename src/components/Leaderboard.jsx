import LeaderboardList from "./LeaderboardList";

const Leaderboard = (props) => {
	return (
		<>
			<button onClick={props.backToGame}>Back to Game</button>
			<div className="title">
				<h2>Name</h2>
				<h2>Score</h2>
			</div>
			<LeaderboardList leaderboardData={props.leaderboardData} />
		</>
	);
};

export default Leaderboard;
