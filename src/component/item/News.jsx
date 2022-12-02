import React, { Component } from "react";
import "./News.css";
import dompurify from "dompurify";
import { Link } from "react-router-dom";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";
import Chip from "../form/Chip.jsx";
import { dateToString } from "../../utils/date.jsx";

export default class News extends Component {
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

	getBoxContent() {
		return (
			<div className="News card">
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
						<div className="News-date">
							{dateToString(this.props.info.publication_date, "DD MMM YYYY")}
						</div>
						{this.props.info.abstract
							&& <div
								className="News-abstract"
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
		);<div dangerouslySetInnerHTML={
					{
						__html:
						b.content.replace("&lt;", "<").replace("&gt;", ">"),
					}
				} />
	}

	render() {
		return this.props.info.link !== null
			&& this.props.info.link !== undefined
			&& this.props.info.link.length > 0
			? <a
				href={this.props.info.link}
				target={"_blank"}
				rel="noreferrer"
				className="News-link">
				{this.getBoxContent()}
			</a>
			: <Link
				to={"/news/" + this.props.info.handle}
				className="News-link">
				{this.getBoxContent()}
			</Link>;
	}
}
