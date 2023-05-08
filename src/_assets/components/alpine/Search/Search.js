
export default () => {

	return {
		metaKey: navigator.platform.indexOf('Mac') === 0 ? '⌘' : 'Ctrl+',
		init() {

		},
	}
}
