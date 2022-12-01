import React from "react";
import "./PageHomeAboutLHC.css";

export default class PageHomeAboutLHC extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div id="PageHomeAboutLHC">
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
