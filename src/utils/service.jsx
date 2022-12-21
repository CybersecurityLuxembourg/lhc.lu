
export function getCounterService(services) {
	if (services) {
		return services
			.filter((s) => s.title.toLowerCase().includes("counter"))
			.pop();
	}

	return null;
}