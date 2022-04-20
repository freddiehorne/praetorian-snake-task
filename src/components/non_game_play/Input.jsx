const Input = (props) => {
	return <input onInput={props.onInput} type="search" value={props.input} />;
};

export default Input;
