
export function getCounterService(services) {
	if (services) {
		return services
			.filter((s) => s.title.toLowerCase().includes("cyber desk"))
			.pop();
	}

	return null;
}