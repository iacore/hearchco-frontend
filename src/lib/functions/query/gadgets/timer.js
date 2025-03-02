import { hmsFromTotal, totalSeconds } from '$lib/functions/gadgets/timer';

/**
 * Check if query is a timer gadget query
 * @param {string} query - Query to be checked
 * @returns {boolean} - Whether query is a timer gadget query or not
 */
export function timery(query) {
	const keywords = [
		// Time-related keywords
		'clock',
		'clok',
		'clcok',
		'time',
		'tme',
		'tim',
		'chronometer',
		'chronometre',
		'chronometer',
		'timekeeper',
		'timekeeper',
		'timepeice',
		'timepiece',
		'timepece',

		// Stopwatch-related keywords
		'digital stopwatch',
		'digitial stopwatch',
		'digtal stopwatch',
		'online stopwatch',
		'online stopwach',
		'online stop watch',
		'simple stopwatch',
		'simple stopwach',
		'simple stop watch',
		'stopwatch',
		'stopwach',
		'stop watch',
		'stopwatch and timer',
		'stopwach and timer',
		'stop watch and timer',
		'stopwatch app',
		'stopwach app',
		'stop watch app',
		'stopwatch download',
		'stopwach download',
		'stop watch download',
		'stopwatch for running',
		'stopwach for running',
		'stop watch for running',
		'stopwatch for sports',
		'stopwach for sports',
		'stop watch for sports',
		'stopwatch online free',
		'stopwach online free',
		'stop watch online free',
		'stopwatch tool',
		'stopwach tool',
		'stop watch tool',
		'stopwatch widget',
		'stopwach widget',
		'stop watch widget',
		'stopwatch with alarm',
		'stopwach with alarm',
		'stop watch with alarm',
		'stopwatch with countdown',
		'stopwach with countdown',
		'stop watch with countdown',
		'stopwatch with laps',
		'stopwach with laps',
		'stop watch with laps',
		'best stopwatch',
		'best stopwach',
		'best stop watch',
		'athletic stopwatch',
		'athletic stopwach',
		'athletic stop watch',
		'lap counter',
		'lap conuter',
		'lap countr',

		// Timer-related keywords
		'digital timer',
		'digitial timer',
		'digtal timer',
		'interval timer',
		'intervl timer',
		'interval timr',
		'kitchen timer',
		'kitchn timer',
		'kitchen timr',
		'lap timer',
		'lap timr',
		'multi-timer',
		'multitimer',
		'multi timr',
		'online timer',
		'online timr',
		'pomodoro timer',
		'pomodro timer',
		'pomodr timer',
		'simple timer',
		'simple timr',
		'study timer',
		'studi timer',
		'study timr',
		'timer',
		'timr',
		'timer app',
		'timr app',
		'timer download',
		'timr download',
		'timer gadget',
		'timr gadget',
		'timer online free',
		'timr online free',
		'timer tool',
		'timr tool',
		'timer widget',
		'timr widget',
		'workout timer',
		'workot timer',
		'workout timr',
		'best timer',
		'best timr',
		'egg timer',
		'eg timer',
		'egg timr',
		'countdown timer',
		'countdon timer',
		'countdown timr',
		'classroom timer',
		'clasroom timer',
		'classrom timer',

		// Countdown-related keywords
		'countdown',
		'countdon',
		'count down',
		'countdown clock',
		'countdon clock',
		'count down clock',
		'countdown timer',
		'countdon timer',
		'count down timer',
		'countdown stopwatch',
		'countdon stopwatch',
		'count down stopwatch',
		'countdown alarm',
		'countdon alarm',
		'count down alarm',

		// Alarm-related keywords
		'alarm',
		'alrm',
		'alrm clock',
		'alarm clock',
		'alarm timr',
		'alarm timer',
		'alarm clock',
		'alarm clk',
		'alarm widget',
		'reminder alarm',
		'remindr alarm',
		'wake-up alarm',
		'wakup alarm',
		'wake up alarm',

		// General Timing Devices
		'time tracking device',
		'time trakcing device',
		'time traking device',
		'time management tool',
		'time managment tool',
		'time mangement tool',
		'time recorder',
		'time recoder',
		'time reocrder',
		'timing gadget',
		'timing gadet',
		'timing gadgt',
		'timing tool',
		'timing tol',
		'timing toool',
		'event timer',
		'evnt timer',
		'event timr',
		'schedule timer',
		'schedul timer',
		'scheudle timer',
		'activity timer',
		'activty timer',
		'activity timr'
	];

	return keywords.some((keyword) => query.trim().toLowerCase().includes(keyword));
}

/**
 * Return hh:mm:ss from timery query.,
 * @param {string} query - Query to be checked,
 * @returns {[number, number, number]} - Array of hours, minutes, and seconds.
 */
export function timeFromTimery(query) {
	// Define regex patterns for hours, minutes, and seconds.
	const hoursRegex = /(\d+)\s*h(?:ours?)?/i;
	const minutesRegex = /(\d+)\s*m(?:inutes?)?/i;
	const secondsRegex = /(\d+)\s*s(?:econds?)?/i;

	// Initialize time values.
	/** @type {number|null} */
	let hours = null;
	/** @type {number|null} */
	let minutes = null;
	/** @type {number|null} */
	let seconds = null;

	// Match and assign hours.
	const hoursMatch = query.match(hoursRegex);
	if (hoursMatch) {
		hours = parseInt(hoursMatch[1]);
	}

	// Match and assign minutes.
	const minutesMatch = query.match(minutesRegex);
	if (minutesMatch) {
		minutes = parseInt(minutesMatch[1]);
	}

	// Match and assign seconds.
	const secondsMatch = query.match(secondsRegex);
	if (secondsMatch) {
		seconds = parseInt(secondsMatch[1]);
	}

	// Calculate total seconds and convert to hh:mm:ss.
	const matchedAny = (hours || minutes || seconds) !== null;
	const total = totalSeconds(hours ?? 0, minutes ?? 0, seconds ?? 0);
	const [convH, convM, convS] = hmsFromTotal(total);

	// Return the converted time as an array if any time is found.
	if (matchedAny) {
		return [convH, convM, convS];
	}

	// Otherwise, return a default time of 00:05:00.
	return [0, 5, 0];
}
