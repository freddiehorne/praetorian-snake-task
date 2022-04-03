const LeaderboardList = (props) => {
	const leaderboardData = props.leaderboardData;

	return leaderboardData.map((person, index) => {
		return (
			<div>
				<p>{person.name}</p>
				<p>{person.points}</p>
			</div>
		);
	});
};

export default LeaderboardList;
