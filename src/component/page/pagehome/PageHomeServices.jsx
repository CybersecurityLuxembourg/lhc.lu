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

						<a href={"https://www.circl.lu/"} target="_blank">
							<div className="PageHomeServices-menu">
								CIRCL
							</div>
						</a>

						<a href={"https://www.nc3.lu/"} target="_blank">
							<div className="PageHomeServices-menu">
								NC3
							</div>
						</a>
					</div>

					<div className="col-md-8">
						<div className="PageHomeServices-content">
							<p>Lorem ipsum dolor sit amet consectetur adipiscing elit morbi augue
							per ad integer, lobortis lacinia cursus justo fringilla viverra faucibus
							porttitor dapibus id venenatis. Gravida consequat placerat dictum
							suspendisse maecenas nascetur ad euismod class, semper condimentum
							rhoncus varius elementum nisi sapien montes nunc, dui faucibus
							fringilla vivamus vestibulum lacinia rutrum mattis.</p>

							<p>Scelerisque commodo proin aliquam dapibus vestibulum ornare
							himenaeos sem, id natoque taciti primis leo dictumst habitant, porta
							eget torquent accumsan semper mauris ad. Porttitor fames luctus
							venenatis primis varius elementum rutrum, auctor sodales nec cursus
							ornare facilisi consequat, aenean cras risus placerat donec
							pulvinar. In gravida mollis primis dignissim, cum massa pretium
							a aliquet, auctor turpis fermentum.</p>
						</div>
					</div>
				</div>
			</div>
		</div>;
	}
}
