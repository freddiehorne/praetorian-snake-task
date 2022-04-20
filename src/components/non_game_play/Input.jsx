const Input = (props) => {
	return (
		<input
			onInput={props.onInput}
			type="text"
			placeholder="Minimum 2 characters"
			value={props.input}
		/>
	);
};

export default Input;
