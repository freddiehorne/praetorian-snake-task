const Snake = (props) => {
	const { snakePosition } = props;
	return (
		<div
			style={{
				top: `${snakePosition[0]}%`,
				left: `${snakePosition[1]}%`,
			}}
			className="snake"
		></div>
	);
};

export default Snake;
