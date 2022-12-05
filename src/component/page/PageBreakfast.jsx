import React from "react";
import "./PageNews.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import Banner from "../bar/Banner.jsx";
import SearchField from "../form/SearchField.jsx";
import { getRequest } from "../../utils/request.jsx";
import News from "../item/News.jsx";
import DynamicTable from "../table/DynamicTable.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class PageNews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			news: null,
			tools: null,
		};
	}

	componentDidMount() {
		this.getNews();
		this.getTools();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics) {
			this.getNews();
			this.getTools();
		}
	}


	getNews(page) {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "CYBERSECURITY BREAKFAST");

			if (values.length > 0) {
				const params = {
					type: "NEWS",
					taxonomy_values: values.map((v) => v.id).join(","),
					per_page: 5,
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
	}

	getTools(page) {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "CYBERSECURITY BREAKFAST");

			if (values.length > 0) {
				const params = {
					type: "TOOL",
					taxonomy_values: values.map((v) => v.id).join(","),
					per_page: 5,
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
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"PageNews"}>
				<Banner
					image={"/img/banner.jpg"}
				/>

				<div className={"page max-sized-page"}>

					<div className="row row-spaced">
						<div className="col-md-12">
							<Breadcrumb>
								<Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
								<Breadcrumb.Item><Link to="/">News & Events</Link></Breadcrumb.Item>
								<Breadcrumb.Item><Link to="/breakfast">Cybersecurity Breakfast</Link></Breadcrumb.Item>
							</Breadcrumb>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<h2>Cybersecurity Breakfast</h2>
						</div>

						<div className="col-md-12">
							{this.state.news
								&& this.state.news.pagination
								&& this.state.news.pagination.total === 0
								&& <div className="row row-spaced">
									<div className="col-md-12">
										<Message
											text={"No CSB found"}
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
										<News
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
