const Snake = (props) => {
	return (
		// <div
		// 	style={{
		// 		top: `${snakePosition[0]}%`,
		// 		left: `${snakePosition[1]}%`,
		// 	}}
		// 	className="snake"
		// ></div>
		<div>
			{props.snakeBlocks.map((block, i) => {
				const style = {
					top: `${block[0]}%`,
					left: `${block[1]}%`,
				};
				return <div className="snake" key={i} style={style}></div>;
			})}{" "}
		</div>
	);
};

export default Snake;
