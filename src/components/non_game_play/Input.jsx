const Input = (props) => {
	const { onInput, input } = props;
	return (
		<input
			type="text"
			placeholder="Minimum 2 characters"
			onInput={onInput}
			value={input}
		/>
	);
};

export default Input;
