
const useState = <T>(initialValue: T) => {

	let _state = initialValue;

	function setState(newValue: T) {
		_state = newValue;
	}

	return () => {

		return [_state, setState];
	}
}