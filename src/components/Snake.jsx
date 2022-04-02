const Snake = (props) => {
	return (
		<div
			style={{
				top: `${props.snakePosition[0]}%`,
				left: `${props.snakePosition[1]}%`,
			}}
			className="snake"
		></div>
	);
};

export default Snake;
