import React from "react";
import "./PageHomeBanner.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { getPrivateAppURL } from "../../../utils/env.jsx";
import ShadowBox from "../../box/ShadowBox.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default class PageHomeBanner extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return <div className="PageHome-banner">
			<Carousel
				dynamicHeight={false}
				showStatus={false}
				showThumbs={false}
				infiniteLoop={true}
				autoPlay={true}
				interval={5000}
			>
				<div>
					<img src="/img/Slide_CYBERLUX_1920x1080.jpg"/>

					<div className="PageHome-banner-slide">
						<div className="max-sized-page">
						</div>
					</div>
				</div>
			</Carousel>
		</div>;
	}
}
