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
					</div>
				</div>

				<div className={"PageContact-content"}>
					<div className="page max-sized-page">
						<div className="row row-spaced">
							<div className="col-md-5 offset-md-7">
								<h1>Contact</h1>
							</div>
						</div>

						<div className="row row-spaced">
							<div className="col-md-3">
								<img
									src={"/img/banner.jpg"}
									alt="Please configure logo"
								/>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-8">
								<h2>LHC - Luxembourg House of Cybersecurity</h2>
								<br/>
								<p>122, Rue Adolphe Fischer, L-1521 Luxembourg</p>
								<p>info@lhc.lu</p>
								<p>(+352) 274 00 98 601</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
