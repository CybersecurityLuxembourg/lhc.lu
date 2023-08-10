import React from "react";
import "./PageNews.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import Banner from "../bar/Banner.jsx";
import SearchField from "../form/SearchField.jsx";
import CheckBox from "../form/CheckBox.jsx";
import { getRequest } from "../../utils/request.jsx";
import Article from "../item/Article.jsx";
import DynamicTable from "../table/DynamicTable.jsx";
import { dictToURI, getUrlParameter } from "../../utils/url.jsx";

export default class PageNews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			news: null,
			newsFilter: this.getUrlFilter(),
		};
	}

	componentDidMount() {
		this.getNews();
	}

	componentDidUpdate(prevProps, prevState) {
		if (!prevProps.lhc && this.props.lhc) {
			this.getNews();
		}

		if (prevState.newsFilter !== this.state.newsFilter) {
			this.getNews();
		}

		if (this.state.newsFilter !== this.getUrlFilter()) {
			this.setState({ newsFilter: this.getUrlFilter() });
		}
	}

	getNews(page) {
		if (this.props.lhc) {
			const params = {
				entities: this.props.lhc.id,
				taxonomy_values: this.getLtacTaxonomyValue() && this.state.newsFilter === "ltac"
					? this.getLtacTaxonomyValue().id : undefined,
				type: "NEWS",
				per_page: 10,
				page: page || 1,
			};

			getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
				this.setState({
					news: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	getLtacTaxonomyValue() {
		if (this.props.analytics) {
			return this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "LËTZ TALK ABOUT CYBER")
				.pop();
		}

		return null;
	}

	getUrlFilter() {
		if (getUrlParameter("filter") && ["ltac"].indexOf(getUrlParameter("filter")) >= 0) {
			return getUrlParameter("filter");
		}

		return null;
	}

	changeUrl(value) {
		this.props.history.push({ search: value ? "filter=" + value : "" });
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"PageNews"}>
				<Banner
					image={"/img/banner-news.jpg"}
				/>

				<div className={"page max-sized-page"}>

					<div className="row row-spaced">
						<div className="col-md-12">
							<Breadcrumb>
								<Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
								<Breadcrumb.Item><Link to="/">News & Events</Link></Breadcrumb.Item>
								<Breadcrumb.Item><Link to="/news">News</Link></Breadcrumb.Item>
							</Breadcrumb>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12 row-spaced">
							<h2>Latest News</h2>
						</div>

						<div className="col-md-12 row-spaced">
							<CheckBox
								label={"All"}
								value={!this.state.newsFilter}
								onClick={() => this.changeUrl(null)}
							/>
							{this.getLtacTaxonomyValue()
								&& <CheckBox
									label={"Lëtz Talk About Cyber - ITV Series"}
									value={this.state.newsFilter === "ltac"}
									onClick={() => this.changeUrl("ltac")}
								/>
							}
						</div>

						<div className="col-md-12">
							{this.state.news
								&& this.state.news.pagination
								&& this.state.news.pagination.total === 0
								&& <div className="row row-spaced">
									<div className="col-md-12">
										<Message
											text={"No news found"}
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
									changePage={(page) => this.getNews(page)}
									buildElement={(a) => <div
										className="col-md-12"
										key={a.id}>
										<Article
											info={a}
											analytics={this.props.analytics}
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
			</div>
		);
	}
}
