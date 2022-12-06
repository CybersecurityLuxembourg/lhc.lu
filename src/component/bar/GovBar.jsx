import React from "react";
import "./GovBar.css";

export default class GovBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="GovBar" className="govbar">
				<a
					href="//gouvernement.lu"
					target="_blank"
					className="govbar-logo"
					rel="noreferrer"
					title="Gouvernement du Grand-Duché de Luxembourg (Nouvelle fenêtre)">
					<img
						src="/img/gov-light.png"
						alt="Gouvernement du Grand-Duché de Luxembourg (Nouvelle fenêtre)"
					/>
				</a>
			</div>
		);
	}
}
