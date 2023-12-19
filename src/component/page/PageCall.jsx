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
		};
	}

	componentDidMount() {
		this.getNews();
	}

	componentDidUpdate(prevProps, prevState) {
		if ((!prevProps.lhc && this.props.lhc)
			|| (!prevProps.analytics && this.props.analytics)) {
			this.getNews();
		}
	}

	getNews(page) {
		if (this.props.lhc && this.props.analytics) {
			const params = {
				entities: this.props.lhc.id,
				taxonomy_values: this.getCallTaxonomyValue(),
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

	getCallTaxonomyValue() {
		if (this.props.analytics) {
			return this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "CALL TO ACTION")
				.pop()
				.id;
		}

		return null;
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
								<Breadcrumb.Item><Link to="/call">Call for projects/services</Link></Breadcrumb.Item>
							</Breadcrumb>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12 row-spaced">
							<h2>Call for projects/services</h2>
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
