import React from "react";
import "./PageArticle.css";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getRequest } from "../../utils/request.jsx";
import { getApiURL } from "../../utils/env.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import SmallArticle from "../item/SmallArticle.jsx";
import {
	getContentFromBlock,
	buildCarousel,
	getNextNonImagePosition,
} from "../../utils/article.jsx";
import { dateToString } from "../../utils/date.jsx";

export default class PageArticle extends React.Component {
	constructor(props) {
		super(props);

		this.getArticleContent = this.getArticleContent.bind(this);
		this.isArticleClosed = this.isArticleClosed.bind(this);

		this.state = {
			article: null,
			relatedArticles: null,
		};
	}

	componentDidMount() {
		this.getArticleContent();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.handle !== this.props.match.params.handle
			|| prevProps.services !== this.props.services) {
			this.getArticleContent();
		}
	}


	getArticleContent() {
		if (this.props.services) {
			this.setState({
				article: null,
				relatedArticles: null,
			});

			getRequest.call(this, "public/get_public_article_content/" + this.props.match.params.handle, (data) => {
				this.setState({
					article: data,
				}, () => {
					if (this.state.article.type === "SERVICE") {
						this.getRelatedServices();
					} else {
						this.getRelatedArticles();
					}
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	getRelatedArticles() {
		getRequest.call(this, "public/get_public_related_articles/" + this.props.match.params.handle + "?include_tags=true", (data2) => {
			this.setState({
				relatedArticles: data2,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getRelatedServices() {
		this.setState({
			relatedArticles: this.props.services,
		});
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	// Determine if the current article is tagged as 'CALL TO ACTION CLOSED'
	isArticleClosed() {
		const a = this.state.article;
		if (!a) return false;

		// Helper: get closed tag IDs from analytics, if available
		const getClosedTagIds = () => {
			if (!this.props.analytics || !this.props.analytics.taxonomy_values) return [];
			return this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE TAG" && v.name === "CALL TO ACTION CLOSED")
				.map((v) => v.id);
		};

		// Case 1: article has taxonomy_values as IDs
		if (Array.isArray(a.taxonomy_values)) {
			const closedIds = getClosedTagIds();
			return a.taxonomy_values.some((id) => closedIds.includes(id));
		}

		// Case 2: article has tags or taxonomy_tags as objects with category/name
		const possibleTags = Array.isArray(a.tags) ? a.tags
			: Array.isArray(a.taxonomy_tags) ? a.taxonomy_tags
				: [];

		if (possibleTags.length > 0) {
			return possibleTags.some((t) => (
				(t.category === "ARTICLE TAG" || t.category === "TAG")
				&& t.name === "CALL TO ACTION CLOSED"
			));
		}

		return false;
	}

	render() {
		let positionToTreat = 0;

		return (
			<div className={"PageArticle page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">HOME</Link></Breadcrumb.Item>
							{this.state.article
								&& <Breadcrumb.Item>
									<Link to={"/" + this.state.article.type.toLowerCase().replaceAll(" ", "-")}>
										{this.state.article.type}
									</Link>
								</Breadcrumb.Item>
							}
							{this.state.article
								&& <Breadcrumb.Item active>
									{this.state.article.title}
								</Breadcrumb.Item>
							}
						</Breadcrumb>
					</div>
				</div>

				{this.state.article && this.state.article.content
					? <div className="row row-spaced">
						<div className={"col-md-8"}>
							<article>
								<div className="PageArticle-content-cover">
									{this.state.article.image
										&& <img
											src={getApiURL() + "public/get_public_image/" + this.state.article.image}/>}

									{this.state.article.type === "NEWS"
										&& <div className='PageArticle-publication-date'>
											{dateToString(this.state.article.publication_date, "DD MMM YYYY")}
										</div>
									}
								</div>

								<h1 className="showFulltext"
									style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
									{this.state.article.title}
									{this.isArticleClosed() && (
										<span className="Article-badge Article-badge-closed"
											  aria-label="This call is closed">Closed</span>
									)}
								</h1>

								{this.state.article.abstract !== null
									&& <div
										className="PageArticle-abstract"
										dangerouslySetInnerHTML={{
											__html:
												dompurify.sanitize(this.state.article.abstract),
										}}>
									</div>
								}

								{this.state.article.content.map((b, i) => {
									if (positionToTreat <= i) {
										if (b.type === "IMAGE") {
											const nextNonImagePosition = getNextNonImagePosition(
												this.state.article.content,
												i,
											);

											const el = buildCarousel(
												this.state.article.content
													.slice(
														i,
														nextNonImagePosition,
													),
											);

											positionToTreat = nextNonImagePosition;

											return el;
										}

										positionToTreat += 1;
										return getContentFromBlock(b);
									}
									return null;
								})}
							</article>
						</div>

						<div className="col-md-4">
							<div className="container">
								<div className="row PageArticle-related-article">
									<div className="col-md-12">
										<h3>
											{this.state.article.type === "SERVICE"
												? "All services"
												: "Related articles"
											}
										</h3>
									</div>

									{this.state.relatedArticles
										&& this.state.relatedArticles.length > 0
										&& this.state.relatedArticles.map((a) => (
											<div
												className="col-md-12"
												key={a.id}>
												<SmallArticle
													key={a.id}
													info={a}
												/>
											</div>
										))
									}

									{this.state.relatedArticles
										&& this.state.relatedArticles.length === 0
										&& <div className="col-md-12">
											<Message
												text={"No related article found"}
												height={150}
											/>
										</div>
									}

									{this.state.relatedArticles === null
										&& <div className="col-md-12">
											<Loading
												height={150}
											/>
										</div>
									}
								</div>
							</div>
						</div>
					</div>
					: <Loading
						height={200}
					/>
				}
			</div>
		);
	}
}
