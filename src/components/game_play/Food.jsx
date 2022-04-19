const Food = (props) => {
	return (
		<div
			className="food"
			style={{
				top: `${props.foodPosition[1]}%`,
				left: `${props.foodPosition[0]}%`,
			}}
		></div>
	);
};

export default Food;
