import React from "react";
import "./PageHomeCatch.css";

export default class PageHomeCatch extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div id="PageHomeCatch">
			<div className="page max-sized-page">
				<div className="row row-spaced">
					<div className="col-md-12">
						A unique place at the service<br/>
						of your cybersecurity needs
					</div>
				</div>
			</div>
		</div>;
	}
}
