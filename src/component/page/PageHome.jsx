import React from "react";
import "./PageHome.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import PageHomeBanner from "./pagehome/PageHomeBanner.jsx";
import PageHomeAboutLHC from "./pagehome/PageHomeAboutLHC.jsx";
import PageHomeCatch from "./pagehome/PageHomeCatch.jsx";

export default class PageHome extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageHome"}>
				<PageHomeBanner/>
				<PageHomeCatch/>
				<PageHomeAboutLHC/>

				<div className="">
					<div className="page max-sized-page">
						<div className="row row-spaced">
							<div className="col-md-12">
								A unique place at the service<br/>
								of your cybersecurity needs
							</div>
						</div>
					</div>
				</div>

				<div className="PageHome-section">
					<div className="page max-sized-page">
						<div className="row row-spaced">
							<div className="col-md-12">
								<h1>About LHC</h1>
							</div>
						</div>
					</div>
				</div>

				<div className="PageHome-section">
					<div className="page max-sized-page">
						<div className="row row-spaced">
							<div className="col-md-12">
								Home
							</div>
						</div>
					</div>
				</div>

				<div className="PageHome-section">
					<div className="page max-sized-page">
						<div className="row row-spaced">
							<div className="col-md-12">
								Home
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
