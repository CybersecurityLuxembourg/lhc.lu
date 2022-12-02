import React from "react";
import "./PageContact.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Banner from "../bar/Banner.jsx";

export default class PageContact extends React.Component {
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
			<div id={"PageContact"}>
				<Banner
					image={"/img/banner.jpg"}
				/>

				<div className="page max-sized-page">
					<div className="row row-spaced">
						<div className="col-md-12">
							<Breadcrumb>
								<Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
								<Breadcrumb.Item><Link to="/contact">Contact</Link></Breadcrumb.Item>
							</Breadcrumb>
						</div>

						<div className="col-md-12">
							About us
						</div>
					</div>
				</div>
			</div>
		);
	}
}
