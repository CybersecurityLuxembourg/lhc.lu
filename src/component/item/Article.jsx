import React, { Component } from "react";
import "./Article.css";
import dompurify from "dompurify";
import { Link } from "react-router-dom";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";
import Chip from "../form/Chip.jsx";
import { dateToString } from "../../utils/date.jsx";

export default class Article extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getImage() {
		const baseUrl = getApiURL() + "public/get_public_image/";

		if (this.props.info.image) {
			return baseUrl + this.props.info.image;
		}

		if (!this.props.info.is_created_by_admin
			&& this.props.info.entity_tags
			&& this.props.info.entity_tags.length > 0
			&& this.props.entities) {
			const entities = this.props.entities
				.filter((c) => this.props.info.entity_tags.indexOf(c.id) >= 0)
				.filter((c) => c.image);

			if (entities.length > 0) {
				return baseUrl + entities[0].image;
			}
		}

		return null;
	}

	getDate() {
		if (this.props.info.type === "EVENT") {
			if (this.props.info.start_date && this.props.info.end_date) {
				return <div>
					{dateToString(this.props.info.start_date, "DD MMM YYYY HH:mm")}
					&nbsp;-&nbsp;
					{dateToString(this.props.info.end_date, "DD MMM YYYY HH:mm")}
				</div>;
			}

			return "No Info"
			
		}

		return dateToString(this.props.info.publication_date, "DD MMM YYYY");
	}

	getBoxContent() {
		return (
			<div className="Article card">
				<div className="card-horizontal">
					<div className="img-square-wrapper">
						{this.getImage()
							? <img
								className="card-img-top"
								src={this.getImage()}
								alt="Article image"/>
							: <NoImage/>
						}
					</div>
					<div className="card-body">
						<h5 className="card-title">{this.props.info.title}</h5>
						<div className="Article-date">
							{this.getDate()}
						</div>
						{this.props.info.abstract
							&& <div
								className="Article-abstract"
								dangerouslySetInnerHTML={
									{
										__html:
										this.props.info.abstract.replace("&lt;", "<").replace("&gt;", ">"),
									}
								}
							/>
						}
					</div>
				</div>
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
				className="Article-link">
				{this.getBoxContent()}
			</a>
			: <Link
				to={"/" + this.props.info.type.toLowerCase().replace(" ", "-") + "/" + this.props.info.handle}
				className="Article-link">
				{this.getBoxContent()}
			</Link>;
	}
}
