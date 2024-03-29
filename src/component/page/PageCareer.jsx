import React from "react";
import "./PageCareer.css";
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

export default class PageCareer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			jobs: null,
			internships: null,
		};
	}

	componentDidMount() {
		this.getJobs();
		this.getInternships();
	}

	componentDidUpdate(prevProps, prevState) {
		if ((!prevProps.lhc && this.props.lhc)
			|| (!prevProps.analytics && this.props.analytics)) {
			this.getJobs();
			this.getInternships();
		}
	}

	getJobs(page) {
		if (this.props.lhc && this.props.analytics) {
			const tv = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "JOB OFFER CATEGORY")
				.filter((v) => v.name === "INTERNSHIP");

			if (tv.length > 0) {
				const params = {
					entities: this.props.lhc.id,
					type: "JOB OFFER",
					ignored_taxonomy_values: tv.map((t) => t.id),
					per_page: 10,
					page: page || 1,
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						jobs: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			}
		}
	}

	getInternships(page) {
		if (this.props.lhc && this.props.analytics) {
			const tv = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "JOB OFFER CATEGORY")
				.filter((v) => v.name === "INTERNSHIP")
				.pop();

			if (tv) {
				const params = {
					entities: this.props.lhc.id,
					type: "JOB OFFER",
					taxonomy_values: tv.id,
					per_page: 10,
					page: page || 1,
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						internships: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			}
		}
	}

	changeUrl(value) {
		this.props.history.push({ search: value ? "filter=" + value : "" });
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"PageCareer"}>
				<Banner
					image={"/img/banner-career.png"}
				/>

				<div className={"page max-sized-page"}>

					<div className="row row-spaced">
						<div className="col-md-12">
							<Breadcrumb>
								<Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
								<Breadcrumb.Item><Link to="/">The Agency</Link></Breadcrumb.Item>
								<Breadcrumb.Item><Link to="/career">Career</Link></Breadcrumb.Item>
							</Breadcrumb>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12 row-spaced">
							<h2>Career</h2>
						</div>

						<div className="col-md-12">
							{this.state.jobs
								&& this.state.jobs.pagination
								&& this.state.jobs.pagination.total === 0
								&& <div className="row row-spaced">
									<div className="col-md-12">
										<Message
											text={"We don’t have any job vacancies at this time but we recommend that you regularly check our Career page."}
											height={200}
										/>
									</div>
								</div>
							}

							{this.state.jobs
								&& this.state.jobs.pagination
								&& this.state.jobs.pagination.total > 0
								&& <DynamicTable
									items={this.state.jobs.items}
									pagination={this.state.jobs.pagination}
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

							{(!this.state.jobs
								|| !this.state.jobs.pagination
								|| !this.state.jobs.items)
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

					<div className="row row-spaced">
						<div className="col-md-12 row-spaced">
							<h2>Internships</h2>
						</div>

						<div className="col-md-12">
							{this.state.internships
								&& this.state.internships.pagination
								&& this.state.internships.pagination.total === 0
								&& <div className="row row-spaced">
									<div className="col-md-12">
										<Message
											text={"We don’t have any internship vacancies at this time but we recommend that you regularly check our Career page."}
											height={200}
										/>
									</div>
								</div>
							}

							{this.state.internships
								&& this.state.internships.pagination
								&& this.state.internships.pagination.total > 0
								&& <DynamicTable
									items={this.state.internships.items}
									pagination={this.state.internships.pagination}
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

							{(!this.state.internships
								|| !this.state.internships.pagination
								|| !this.state.internships.items)
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
