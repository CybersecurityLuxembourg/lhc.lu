import React from "react";
import "./Banner.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default class Banner extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return <div className="Banner">
			<img src={this.props.image} alt={this.props.alt || "Banner image"}/>
		</div>;
	}
}
