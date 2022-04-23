const LeaderboardList = (props) => {
	const { leaderboardData } = props;

	leaderboardData.sort((item1, item2) => {
		const first = item1.points;
		const second = item2.points;
		return second - first;
	});

	return (
		<div className="leaderboardList">
			<ol>
				{leaderboardData.map((person) => (
					<li key={person.id}>
						<p>{person.name}</p>
						<p>{person.points}</p>
					</li>
				))}
			</ol>
		</div>
	);
};

export default LeaderboardList;
