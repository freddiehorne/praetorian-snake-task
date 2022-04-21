const Food = (props) => {
	const { foodPosition } = props;
	return (
		<div
			className="food"
			style={{
				top: `${foodPosition[1]}%`,
				left: `${foodPosition[0]}%`,
			}}
		></div>
	);
};

export default Food;
