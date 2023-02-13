import React from "react";
import "./PageHomeCatch.css";

export default class PageHomeCatch extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div id="PageHomeCatch" className="PageHome-section">
			<div className="page max-sized-page">
				<div className="row row-spaced">
					<div className="col-md-12">
						<div className="PageHomeCatch-catch">
							<div className="PageHomeCatch-quote"/>
							The gateway to cyber resilience
						</div>
					</div>
				</div>
			</div>
		</div>;
	}
}
