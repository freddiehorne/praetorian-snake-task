const Input = (props) => {
	const { setInput, input } = props;
	const onInput = (e) => setInput(e.target.value);
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
