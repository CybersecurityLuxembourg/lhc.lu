import React from "react";
import "./PageHome.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Banner from "../bar/Banner.jsx";
import PageHomeAboutLHC from "./pagehome/PageHomeAboutLHC.jsx";
import PageHomeCatch from "./pagehome/PageHomeCatch.jsx";
import PageHomeServices from "./pagehome/PageHomeServices.jsx";
import PageHomeNews from "./pagehome/PageHomeNews.jsx";
import PageHomeEvents from "./pagehome/PageHomeEvents.jsx";


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
				<Banner
 					image={"/img/banner.jpg"}
 				/>
				<PageHomeCatch/>
				<PageHomeAboutLHC/>
				<PageHomeServices
					lhc={this.props.lhc}
				/>
				<PageHomeNews
					lhc={this.props.lhc}
				/>
				<PageHomeEvents
					lhc={this.props.lhc}
				/>
			</div>
		);
	}
}
