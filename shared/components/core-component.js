export default class CoreComponent {
	/**
	 * @param {any} props
	 * @param {HTMLElement} [element]
	 */
	constructor(props, element) {
		this.props = props;
		this.element = element;

		if (typeof document !== 'undefined' && this.element) {
			this.element.innerHTML = this.render();
			this.setUpListeners();
		}
	}

	render() {
		return '';
	}

	setUpListeners() {}

	toString() {
		return this.render();
	}
}
