/**
 * @param {object} settings
 * @param {number} settings.intervalInMs
 */
export const createLongPoller = ({ intervalInMs }) => {
	let msUntilNextRequest = 0;

	/**
	 * @param {object} settings
	 * @param {Function} settings.apiCaller
	 * @param {any[]} settings.callerParams
	 * @param {number} [settings.timeInMs]
	 */
	const scheduleNextPoll = async ({
		apiCaller,
		callerParams,
		timeInMs = 0
	}) => {
		if (msUntilNextRequest <= timeInMs) {
			await apiCaller(callerParams);

			msUntilNextRequest = timeInMs + intervalInMs;
		}

		requestAnimationFrame((newTimeInMs) => {
			scheduleNextPoll({ apiCaller, callerParams, timeInMs: newTimeInMs });
		});
	};

	return scheduleNextPoll;
};
