import React from "react";
import "./PageSearch.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import Message from "../box/Message.jsx";
import Loading from "../box/Loading.jsx";
import ArticleHorizontal from "../item/ArticleHorizontal.jsx";
import DynamicTable from "../table/DynamicTable.jsx";
import SearchField from "../form/SearchField.jsx";
import { getUrlParameter, dictToURI } from "../../utils/url.jsx";

export default class PageSearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			articleTypes: ["NEWS"],
			searchValue: getUrlParameter("r") ? decodeURI(getUrlParameter("r")) : null,
		};
	}

	componentDidMount() {
		this.getArticles();

		if (getUrlParameter("r")) {
			PageSearch.trackSearch(getUrlParameter("r"));
		}
	}

	componentDidUpdate(_, prevState) {
		if (decodeURI(this.state.searchValue) !== decodeURI(getUrlParameter("r"))) {
			this.setState({
				searchValue: getUrlParameter("r") === null ? null : decodeURI(getUrlParameter("r")),
			}, () => {
				this.getArticles();
			});
		}

		if (prevState.searchValue !== this.state.searchValue && this.state.searchValue) {
			PageSearch.trackSearch(this.state.searchValue);
		}
	}

	getArticles() {
		for (let i = 0; i < this.state.articleTypes.length; i++) {
			this.getArticlesByType(this.state.articleTypes[i]);
		}
	}

	getArticlesByType(type, page) {
		const filters = {
			title: this.state.searchValue,
			include_tags: "true",
			type,
			page,
			per_page: 3,
		};

		getRequest.call(this, "public/get_public_articles?" + dictToURI(filters), (data) => {
			this.setState({
				[type.replace(" ", "_")]: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	hasLoaded() {
		return this.state.NEWS;
	}

	static trackSearch(k) {
		// eslint-disable-next-line no-underscore-dangle,no-multi-assign
		const paq = window._paq = window._paq || [];
		paq.push(["trackSiteSearch", k]);
	}

	render() {
		return (
			<div className={"PageSearch page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/search">SEARCH</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<SearchField
							value={this.state.searchValue}
						/>
					</div>
				</div>

				{!this.hasLoaded()
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Loading
								height={300}
							/>
						</div>
					</div>
				}

				{this.hasLoaded()
					&& this.state.NEWS.pagination.total === 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Message
								text={"No item found"}
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.NEWS && this.state.NEWS.items.length > 0
					&& <div className="row">
						<div className="col-md-12">
							<h3>{this.state.NEWS !== null
								? this.state.NEWS.pagination.total + " " : ""}news</h3>
							<DynamicTable
								items={this.state.NEWS.items}
								pagination={this.state.NEWS.pagination}
								changePage={(page) => this.getArticlesByType("NEWS", page)}
								buildElement={(a) => (
									<div className="col-md-12">
										<ArticleHorizontal
											info={a}
											analytics={this.props.analytics}
										/>
									</div>
								)}
							/>
						</div>
					</div>
				}
			</div>
		);
	}
}
