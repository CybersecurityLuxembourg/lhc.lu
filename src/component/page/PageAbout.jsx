import React from "react";
import "./PageAbout.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

export default class PageAbout extends React.Component {
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
			<div id={"PageAbout"} className="page max-sized-page">
				<div className="row row-spaced">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">LUXEMBOURG HOUSE OF CYBERSECURITY</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/about">ABOUT</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>

					<div className="col-md-12">
						About us
					</div>
				</div>
			</div>
		);
	}
}
