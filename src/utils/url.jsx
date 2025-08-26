export function getUrlParameter(sParam) {
	const sPageURL = window.location.search.substring(1);
	const sURLVariables = sPageURL.split("&");

	for (let i = 0; i < sURLVariables.length; i++) {
		const sParameterName = sURLVariables[i].split("=");

		if (sParameterName[0] === sParam) {
			return sParameterName[1];
		}
	}

	return null;
}

export function dictToURI(dict) {
    if (!dict) return ""

    const parts = [];
    Object.keys(dict).forEach((key) => {
        const val = dict[key];
        if (typeof val === "boolean") {
            parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`);
        } else if (typeof val === "string" && val.length > 0) {
            parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
        } else if (Array.isArray(val) && val.length > 0) {
            parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(val.join(","))}`);
        } else if (Number.isInteger(val)) {
            parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`);
        }
    });

    return parts.join("&");
}
