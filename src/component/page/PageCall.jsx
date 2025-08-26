import React from "react";
import "./PageNews.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Banner from "../bar/Banner.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";
import CallList from "../list/CallList.jsx";
import ClosedCallsAccordion from "../box/ClosedCallsAccordion.jsx";

export default class PageNews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			news: null,
			closedNews: null,
			showClosed: false,
		};
	}

	componentDidMount() {
		this.getNews();
		this.getClosedCalls();
	}

	componentDidUpdate(prevProps, prevState) {
		if ((!prevProps.lhc && this.props.lhc)
			|| (!prevProps.analytics && this.props.analytics)) {
			this.getNews();
			this.getClosedCalls();
		}
	}

	getClosedCalls(page) {
		if (this.props.lhc && this.props.analytics) {
			const callCategoryId = this.getCallTaxonomyValue();
			const closedTagIds = this.getClosedCallTagTaxonomyValues();

			const params = {
				entities: this.props.lhc.id,
				taxonomy_values: closedTagIds,
				include_tags: true,
				order_by: "publication_date",
				order: "desc",
				type: "NEWS",
				per_page: 50,
				page: page || 1,
			};

			getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
				// Ensure items have BOTH the call category and the closed tag
				const filtered = (data.items || []).filter((it) =>
					Array.isArray(it.taxonomy_tags)
					&& it.taxonomy_tags.includes(callCategoryId)
					&& it.taxonomy_tags.some((id) => closedTagIds.includes(id))
				);
				this.setState({
					closedNews: { ...data, items: filtered },
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	getNews(page) {
		if (this.props.lhc && this.props.analytics) {
			const params = {
				entities: this.props.lhc.id,
				taxonomy_values: this.getCallTaxonomyValue(),
				ignored_taxonomy_values: this.getClosedCallTagTaxonomyValues().map((id) => String(id)),
				order_by: "publication_date",
				order: "desc",
				type: "NEWS",
				per_page: 50,
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
				?.id;
		}

		return null;
	}

	getClosedCallTagTaxonomyValues() {
		// Return an array of taxonomy value IDs for the tag 'CALL TO ACTION CLOSED'
		if (this.props.analytics) {
			return this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE TAG")
				.filter((v) => v.name === "CALL TO ACTION CLOSED")
				.map((v) => v.id);
		}

		return [];
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"PageNews"}>
				<Banner
					image={"/img/banner-calls.png"}
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
							<CallList
								items={this.state.news && this.state.news.items}
								analytics={this.props.analytics}
								loading={!this.state.news || !this.state.news.items}
								emptyText={"No call found"}
							/>

							<ClosedCallsAccordion
								open={this.state.showClosed}
								onToggle={() => this.setState({ showClosed: !this.state.showClosed })}
								count={(this.state.closedNews && this.state.closedNews.items && this.state.closedNews.items.length) || 0}
							>
								<CallList
									items={this.state.closedNews && this.state.closedNews.items}
									analytics={this.props.analytics}
									itemProps={{ closed: true }}
									loading={!this.state.closedNews || !this.state.closedNews.items}
									emptyText={"No closed call found"}
								/>
							</ClosedCallsAccordion>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
