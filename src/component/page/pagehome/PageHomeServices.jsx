import React from "react";
import "./PageHomeServices.css";
import { Link } from "react-router-dom";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import Loading from "../../box/Loading.jsx";
import NoImage from "../../box/NoImage.jsx";
import Message from "../../box/Message.jsx";
import { getApiURL } from "../../../utils/env.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import { dateToString } from "../../../utils/date.jsx";

export default class PageHomeServices extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			services: null,
			selectedGlobalService: 0,
			selectedFacilityService: 0,
			selectedEntity: 0,
			entities: [
				{
					name: "CIRCL",
					url: "https://circl.lu",
					image: "/img/circl-logo.png",
					description: (() => {
						return <div>
							<p>The Computer Incident Response Center Luxembourg (CIRCL) is a government-driven
							initiative designed to provide a systematic response facility to
							computer security threats and incidents.</p>

							<p>CIRCL is the CERT for the private sector, communes
							and non-governmental entities in Luxembourg.</p>
						</div>
					})(),
				},
				{
					name: "NC3",
					url: "https://nc3.lu",
					image: "/img/nc3-logo.png",
					description: (() => {
						return <div>
							<p>The purpose of the Luxembourg National Cybersecurity Competence
							Center (NC3) is to strengthen the Country's ecosystem facing cyber
							threats and risks, by building cybersecurity competence and capacity, in a
							way that contributes to develop the cybersecurity industrial base in the
							country, and strengthens the strategic autonomy of the European Union.</p>
						</div>;
					})(),
				},
			],
		};
	}

	componentDidMount() {
		this.getServices();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.lhc && this.props.lhc) {
			this.getServices();
		}
	}

	getServices() {
		if (this.props.lhc) {
			const params = {
				entities: this.props.lhc.id,
				type: "SERVICE",
			};

			getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
				this.setState({
					services: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	getGlobalServices() {
		return this.state.services.items
			.filter((s) => this.props.facilityServices.indexOf(s.title.toLowerCase()) < 0);
	}

	getFacilityServices() {
		return this.state.services.items
			.filter((s) => this.props.facilityServices.indexOf(s.title.toLowerCase()) >= 0);
	}

	render() {
		return <div id="PageHomeServices" className="PageHome-section">
			<div className="page max-sized-page">
				<div className="row">
					<div className="col-md-12">
						<h1>Services & Facilites</h1>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-4">
						<h3>Services</h3>

						{!this.state.services
							&& <Loading
								height={200}
							/>
						}

						{this.state.services
							&& this.getGlobalServices().length === 0
							&& <Message
								text={"No service found"}
								height={200}
							/>
						}

						{this.state.services && this.getGlobalServices().length > 0
							&& this.getGlobalServices().map((s, i) => (
							<a href="#">
								<div onClick={() => this.setState({ selectedGlobalService: i })}>
									<div className="PageHomeServices-menu">
										{this.state.selectedGlobalService === i
											&& <div className={"arrow right"}/>
										}
										{s.title}
									</div>
								</div>
							</a>
						))}
					</div>

					<div className="col-md-8">
						<div className="PageHomeServices-content">
							{!this.state.services
								&& <Loading
									height={200}
								/>
							}

							{this.state.services && this.getGlobalServices().length === 0
								&& <Message
									text={"No service found"}
									height={200}
								/>
							}

							{this.state.services
								&& this.getGlobalServices().length > 0
								&& this.state.selectedGlobalService < this.getGlobalServices().length
								&& <a
									href={"/service/" + this.getGlobalServices()[this.state.selectedGlobalService].handle}
									className={"PageHomeServices-service-link"}>
									<div className="PageHomeServices-service-desc">
										<div className="PageHomeServices-service-desc-abstract-wrap">
											<div
												className="PageHomeServices-service-desc-abstract"
												dangerouslySetInnerHTML={{
												__html: dompurify.sanitize(
													this.getGlobalServices()[this.state.selectedGlobalService].abstract
												),
											}}/>
											<button>
												More information
											</button>
										</div>
										<div className="PageHomeServices-service-desc-image">
											{this.getGlobalServices()[this.state.selectedGlobalService].image
												? <img
													src={getApiURL() + "public/get_public_image/"
														+ this.getGlobalServices()[this.state.selectedGlobalService].image}
													alt="Service image"/>
												: <NoImage/>
											}
										</div>
									</div>
								</a>
							}
						</div>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-8">
						<div className="PageHomeServices-content">
							{!this.state.services
								&& <Loading
									height={200}
								/>
							}

							{this.state.services && this.getFacilityServices().length === 0
								&& <Message
									text={"No service found"}
									height={200}
								/>
							}

							{this.state.services
								&& this.getFacilityServices().length > 0
								&& this.state.selectedFacilityService < this.getFacilityServices().length
								&& <a
									href={"/service/" + this.getFacilityServices()[this.state.selectedFacilityService].handle}
									className={"PageHomeServices-service-link"}>
									<div className="PageHomeServices-service-desc">
										<div className="PageHomeServices-service-desc-abstract-wrap">
											<div
												className="PageHomeServices-service-desc-abstract"
												dangerouslySetInnerHTML={{
												__html: dompurify.sanitize(
													this.getFacilityServices()[this.state.selectedFacilityService].abstract
												),
											}}/>
											<button>
												More information
											</button>
										</div>
										<div className="PageHomeServices-service-desc-image">
											{this.getFacilityServices()[this.state.selectedFacilityService].image
												? <img
													src={getApiURL() + "public/get_public_image/"
														+ this.state.services.items[this.state.selectedFacilityService].image}
													alt="Service image"/>
												: <NoImage/>
											}
										</div>
									</div>
								</a>
							}
						</div>
					</div>

					<div className="col-md-4">
						<h3>Facilities</h3>

						{!this.state.services
							&& <Loading
								height={200}
							/>
						}

						{this.state.services
							&& this.getFacilityServices().length === 0
							&& <Message
								text={"No service found"}
								height={200}
							/>
						}

						{this.state.services && this.getFacilityServices().length > 0
							&& this.getFacilityServices().map((s, i) => (
							<a href="#">
								<div onClick={() => this.setState({ selectedFacilityService: i })}>
									<div className="PageHomeServices-menu">
										{this.state.selectedFacilityService === i
											&& <div className={"arrow right"}/>
										}
										{s.title}
									</div>
								</div>
							</a>
						))}
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-4">
						<h3>Hosted by LHC</h3>

						{this.state.entities.map((s, i) => (
							<a href="#">
								<div onClick={() => this.setState({ selectedEntity: i })}>
									<div className="PageHomeServices-menu">
										{this.state.selectedEntity === i
											&& <div className={"arrow right"}/>
										}
										{s.name}
									</div>
								</div>
							</a>
						))}
					</div>

					<div className="col-md-8">
						<div className="PageHomeServices-content">
							<a
								href={this.state.entities[this.state.selectedEntity].url}
								className={"PageHomeServices-service-link"}>
								<div className="PageHomeServices-service-desc">
									<div className="PageHomeServices-service-desc-abstract-wrap">
										<div className="PageHomeServices-service-desc-abstract">
											{this.state.entities[this.state.selectedEntity].description}
										</div>
										<button>
											More information
										</button>
									</div>
									<div className="PageHomeServices-service-desc-image">
										{this.state.entities[this.state.selectedEntity].image
											? <img
												src={this.state.entities[this.state.selectedEntity].image}
												alt="Service image"/>
											: <NoImage/>
										}
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>;
	}
}
