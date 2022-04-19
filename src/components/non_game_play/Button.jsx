const Button = (props) => {
	const { action, name } = props;
	return <button onClick={action}>{name}</button>;
};

export default Button;
