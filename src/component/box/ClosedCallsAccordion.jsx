import React from "react";

export default function ClosedCallsAccordion({ id = "closed-calls", title = "Closed calls", count = 0, open = false, onToggle, children }) {
	const label = `${title} (${count})`;
	return (
		<div className="row row-spaced">
			<div className="col-md-12">
				<button
					className="btn btn-link p-0"
					aria-expanded={open}
					aria-controls={`${id}-panel`}
					onClick={onToggle}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							onToggle && onToggle();
						}
					}}
				>
					<h3 className="mb-0" id={`${id}-label`}>
						{open ? "▼" : "▶"} {label}
					</h3>
				</button>
				<div id={`${id}-panel`} role="region" aria-labelledby={`${id}-label`} hidden={!open}>
					{open && children}
				</div>
			</div>
		</div>
	);
}
