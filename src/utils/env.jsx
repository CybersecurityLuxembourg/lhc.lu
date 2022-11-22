export function getApiURL() {
	if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") {
		return "http://localhost:5000/";
	}
	if (window.location.hostname.includes("test.")) {
		return "https://api.test.cybersecurity.lu/";
	}
	return "https://api.cybersecurity.lu/";
}

export function getPrivateAppURL() {
	if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") {
		return "http://localhost:3001/";
	}
	if (window.location.hostname.includes("test.")) {
		return "https://community.test.cybersecurity.lu/";
	}
	return "https://community.cybersecurity.lu/";
}

export function isInternetExplorer() {
	const ua = window.navigator.userAgent;
	const msie = ua.indexOf("MSIE ");

	return msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./);
}
