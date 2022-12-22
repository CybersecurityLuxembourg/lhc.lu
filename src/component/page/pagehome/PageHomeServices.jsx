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
			selectedService: 0,
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
					services: data.items,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	render() {
		return <div id="PageHomeServices" className="PageHome-section">
			<div className="page max-sized-page">
				<div className="row">
					<div className="col-md-12">
						<h1>Services</h1>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-4">
						{!this.state.services
							&& <Loading
								height={200}
							/>
						}

						{this.state.services
							&& this.state.services.length === 0
							&& <Message
								text={"No service found"}
								height={200}
							/>
						}

						{this.state.services && this.state.services.length > 0
							&& this.state.services.map((s, i) => (
							<a href="#">
								<div onClick={() => this.setState({ selectedService: i })}>
									<div className="PageHomeServices-menu">
										{this.state.selectedService === i
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

							{this.state.services && this.state.services.length === 0
								&& <Message
									text={"No service found"}
									height={200}
								/>
							}

							{this.state.services
								&& this.state.services.length > 0
								&& this.state.selectedService < this.state.services.length
								&& <a
									href={"/service/" + this.state.services[this.state.selectedService].handle}
									className={"PageHomeServices-service-link"}>
									<div className="PageHomeServices-service-desc">
										<div className="PageHomeServices-service-desc-abstract-wrap">
											<div
												className="PageHomeServices-service-desc-abstract"
												dangerouslySetInnerHTML={{
												__html: dompurify.sanitize(
													this.state.services[this.state.selectedService].abstract
												),
											}}/>
											<button>
												More information
											</button>
										</div>
										<div className="PageHomeServices-service-desc-image">
											{this.state.services[this.state.selectedService].image
												? <img
													src={getApiURL() + "public/get_public_image/"
														+ this.state.services[this.state.selectedService].image}
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
			</div>
		</div>;
	}
}
