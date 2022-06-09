export default class CoreComponent {
	/**
	 * @param {any} props
	 */
	constructor(props) {
		this.props = props;
	}

	render() {
		return '';
	}

	setUpListeners() {}

	toString() {
		return this.render();
	}
}
