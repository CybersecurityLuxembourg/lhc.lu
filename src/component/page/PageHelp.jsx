import React from "react";
import "./PageHelp.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Banner from "../bar/Banner.jsx";

export default class PageHelp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageHelp"}>
				<Banner
					image={"/img/banner.jpg"}
				/>

				<div className="page max-sized-page">
					<div className="row row-spaced">
						<div className="col-md-12">
							<Breadcrumb>
								<Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
								<Breadcrumb.Item><Link to="/help">Need help?</Link></Breadcrumb.Item>
							</Breadcrumb>
						</div>
					</div>
				</div>

				<div className="page max-sized-page">
					<div className="row row-spaced">
						<div className="col-md-12 row-spaced">
							The goal of LHC’s public mission is to help citizens and businesses
							improve their cyber-protection. While a wide range of services
							and tools are available through the 2 centres hosted by
							LHC, CIRCL and NC3, you will find below a comprehensive list
							of public service helplines.
						</div>

						<div className="col-md-12">
							<table>
								dkkk
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
