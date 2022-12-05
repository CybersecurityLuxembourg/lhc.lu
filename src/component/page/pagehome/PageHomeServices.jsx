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

		this.setState({
			timer: setInterval(() => {
				this.changeService();
			}, 5000),
		});
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.lhc && this.props.lhc) {
			this.getServices();
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.timer);
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

	changeService() {
		if (this.state.services) {
			if (this.state.selectedService === null) {
				this.setState({ selectedService: 0 });
			} else if (this.state.services.items.length <= this.state.selectedService + 1) {
				this.setState({ selectedService: 0 });
			} else {
				this.setState({ selectedService: this.state.selectedService + 1 });
			}
		}
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

						{this.state.services && this.state.services.items.length === 0
							&& <Message
								text={"No service found"}
								height={200}
							/>
						}

						{this.state.services && this.state.services.items.length > 0
							&& this.state.services.items.map((s) => (
							<a href={"/service/" + s.handle}>
								<div className="PageHomeServices-menu">
									{s.title}
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

							{this.state.services && this.state.services.items.length === 0
								&& <Message
									text={"No service found"}
									height={200}
								/>
							}

							{this.state.services && this.state.services.items.length > 0
								&& this.state.selectedService < this.state.services.items.length
								&& <a
									href={"/service/" + this.state.services.items[this.state.selectedService].handle}
									className={"PageHomeServices-service-link"}>
									<div className="PageHomeServices-service-desc">
										<div className="PageHomeServices-service-desc-abstract-wrap">
											<div
												className="PageHomeServices-service-desc-abstract"
												dangerouslySetInnerHTML={{
												__html: dompurify.sanitize(
													this.state.services.items[this.state.selectedService].abstract
												),
											}}/>
										</div>
										<div className="PageHomeServices-service-desc-image">
											{this.state.services.items[this.state.selectedService].image
												? <img
													src={getApiURL() + "public/get_public_image/"
														+ this.state.services.items[this.state.selectedService].image}
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

					<div className="col-md-4">
						<h3>Facilities</h3>

						<a href={"/meetings"}>
							<div className="PageHomeServices-menu">
								Our rooms for meetings, training & conferences
							</div>
						</a>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-4">
						<h3>Services</h3>

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
