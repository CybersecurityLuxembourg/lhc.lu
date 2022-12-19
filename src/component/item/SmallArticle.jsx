import React, { Component } from "react";
import "./SmallArticle.css";
import dompurify from "dompurify";
import { Link } from "react-router-dom";

export default class SmallArticle extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getBoxContent() {
		return (
			<div className="SmallArticle">
				{this.props.selected
					&& <div className={"arrow right"}/>
				}
				{this.props.info.title}
			</div>
		);
	}

	render() {
		return this.props.info.link !== null
			&& this.props.info.link !== undefined
			&& this.props.info.link.length > 0
			? <a
				href={this.props.info.link}
				target={"_blank"}
				rel="noreferrer"
				className="SmallArticle-link">
				{this.getBoxContent()}
			</a>
			: <Link
				to={`/${this.props.info.type.toLowerCase()}/${this.props.info.handle}`}
				className="SmallArticle-link">
				{this.getBoxContent()}
			</Link>;
	}
}
