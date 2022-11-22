import React from "react";
import "./PageNews.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import SearchField from "../form/SearchField.jsx";
import { getRequest } from "../../utils/request.jsx";
import Article from "../item/Article.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class PageNews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			news: null,
		};
	}

	componentDidMount() {
		this.getNews();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.analytics === null && this.props.analytics !== null) {
			this.getNews();
		}
	}

	getNews(categoryValue, stateName) {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === categoryValue);

			const params = {
				type: "NEWS",
				include_tags: "true",
				taxonomy_values: values.map((v) => v.id).join(","),
				per_page: 2,
				page: 1,
			};

			getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
				this.setState({
					[stateName]: data.items
						.filter((a) => categoryValue !== "CALL TO ACTION"
							|| (a.end_date && a.end_date > new Date().toISOString())),
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"PageNews"} className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">LUXEMBOURG HOUSE OF CYBERSECURITY</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/news">NEWS</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>

					<div className="col-md-12">
						<a
							className="PageNews-title-link"
							href={"/search?member_articles_only=true"}>
							<div className="PageNews-title">
								<h3>MEMBER NEWS <span>more</span></h3>
							</div>
						</a>
					</div>

					<div className="col-md-12">
						{this.state.news
							&& this.state.news.pagination
							&& this.state.news.pagination.total === 0
							&& <div className="row row-spaced">
								<div className="col-md-12">
									<Message
										text={"No article found"}
										height={200}
									/>
								</div>
							</div>
						}

						{this.state.news
							&& this.state.news.pagination
							&& this.state.news.pagination.total > 0
							&& <DynamicTable
								items={this.state.news.items}
								pagination={this.state.news.pagination}
								changePage={(page) => this.getArticles(page)}
								buildElement={(a) => <div
									className="col-md-12"
									key={a.id}>
									<ArticleHorizontal
										info={a}
										analytics={this.props.analytics}
										entities={this.state.entities}
									/>
								</div>
								}
							/>
						}

						{(!this.state.news
							|| !this.state.news.pagination
							|| !this.state.news.items)
							&& <div className="row row-spaced">
								<div className="col-md-12">
									<Loading
										height={200}
									/>
								</div>
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
}
