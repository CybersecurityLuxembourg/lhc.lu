import React from "react";
import "./Banner.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { getPrivateAppURL } from "../../utils/env.jsx";
import ShadowBox from "../box/ShadowBox.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default class Banner extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return <div className="Banner">
			<img src={this.props.image}/>
		</div>;
	}
}
