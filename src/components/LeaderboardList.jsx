const LeaderboardList = (props) => {
	const leaderboardData = props.leaderboardData;

	leaderboardData.sort((item1, item2) => {
		const first = item1.points;
		const second = item2.points;
		return second - first;
	});

	return (
		<div>
			<ol>
				{leaderboardData.map((person, i) => (
					<li key={i}>
						<p>{person.name}</p>
						<p>{person.points}</p>
					</li>
				))}
			</ol>
		</div>
	);

	// return leaderboardData.map((person, index) => {
	// 	return (
	// 		<div className="leaderInfo" key={index}>
	// 			<p>{person.name}</p>
	// 			<p>{person.points}</p>
	// 		</div>
	// 	);
	// });
};

export default LeaderboardList;
