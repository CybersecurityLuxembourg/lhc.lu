import React from "react";
import "./PagePublications.css";
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
import { dateToString } from "../../utils/date.jsx";

export default class PagePublications extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			resources: null,
			resourceFilter: getUrlParameter("filter")
				? getUrlParameter("filter") : null,
			resourceCategories: [
				"CYBER THREAT LANDSCAPE",
				"LHC FORUM",
			],
		};
	}

	componentDidMount() {
		this.getResources();
	}

	componentDidUpdate(prevProps, prevState) {
		if (!prevProps.lhc && this.props.lhc) {
			this.getResources();
		}

		if (prevState.resourceFilter !== this.state.resourceFilter) {
			this.getResources();
		}

		if (this.state.resourceFilter !== this.getUrlFilter()) {
			this.setState({ resourceFilter: this.getUrlFilter() });
		}
	}

	getResources(page) {
		if (this.props.lhc) {
			const params = {
				type: "RESOURCE",
				per_page: 10,
				page: page || 1,
				order: "desc",
				entities: this.props.lhc.id,
				taxonomy_values: this.getTaxonomyValues().filter((v) => v.name === this.state.resourceFilter || !this.state.resourceFilter).pop()
						? this.getTaxonomyValues().filter((v) => v.name === this.state.resourceFilter || !this.state.resourceFilter).pop().id
						: undefined,
			};

			getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
				this.setState({
					resources: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	getTaxonomyValues() {
		if (this.props.analytics) {
			return this.props.analytics.taxonomy_values
				.filter((v) => v.category === "RESOURCE CATEGORY")
				.filter((v) => this.state.resourceCategories.includes(v.name));
		}

		return [];
	}

	getUrlFilter() {
		if (getUrlParameter("filter")) {
			return getUrlParameter("filter").replaceAll("%20", " ").toUpperCase();
		}

		return null;
	}

	changeUrl(value) {
		this.props.history.push({ search: value
			? "filter=" + value.toLowerCase()
			: "" });
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"PagePublications"}>
				<Banner
					image={"/img/banner-publications.png"}
				/>

				<div className={"page max-sized-page"}>

					<div className="row row-spaced">
						<div className="col-md-12">
							<Breadcrumb>
								<Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
								<Breadcrumb.Item><Link to="/publications">Publications</Link></Breadcrumb.Item>
							</Breadcrumb>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12 row-spaced">
							<h2>Publications</h2>
						</div>

						<div className="col-md-8 row-spaced">
							{this.state.resourceCategories.map((v) => (
								<CheckBox
									label={v}
									value={this.state.resourceFilter === v || !this.state.resourceFilter}
									onClick={() => this.changeUrl(v)}
								/>
							))}
						</div>

						<div className="col-md-12">
							{this.state.resources
								&& this.state.resources.pagination
								&& this.state.resources.pagination.total === 0
								&& <div className="row row-spaced">
									<div className="col-md-12">
										<Message
											text={"No publication found"}
											height={200}
										/>
									</div>
								</div>
							}

							{this.state.resources
								&& this.state.resources.pagination
								&& this.state.resources.pagination.total > 0
								&& <DynamicTable
									items={this.state.resources.items}
									pagination={this.state.resources.pagination}
									changePage={(page) => this.getArticles(page)}
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

							{(!this.state.resources
								|| !this.state.resources.pagination
								|| !this.state.resources.items)
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
