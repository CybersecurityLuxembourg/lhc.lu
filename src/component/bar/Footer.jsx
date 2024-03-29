import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { getPrivateAppURL } from "../../utils/env.jsx";
import { getCounterService } from "../../utils/service.jsx";

export default class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="Footer">
				<div className="Footer-content">
					<div className="row">
						<div className="col-md-2 Footer-contact">
							<img
								className={"Footer-logo"}
								src="/img/lhc-logo-white.png"
								alt="LHC Logo"
							/>
							<br/>
							<div>122 rue Adolphe Fischer</div>
							<div>L-1521 Luxembourg</div>
							<br/>
							<div>
								<a href="mailto:info@lhc.lu">info@lhc.lu</a>
							</div>
							<div>(+352) 274 00 98 601</div>
							<br/>
							<a
								href={"https://api.cybersecurity.lu/public/get_public_document/LHC_Legal_Notice.pdf"}
								rel="noreferrer"
								target="_blank"
								title="Terms of use">
								<i className="fas fa-gavel"/> Terms of Service & Privacy Policy
							</a>
							<br/>
							<br/>
							<div className="Footer-network">
								<a
									href="https://twitter.com/houseofcyber_lu"
									rel="noreferrer"
									target="_blank"
									title="X LHC"
									className="text-capitalize">
									<img
										src="/img/logo-x.svg"
										alt="X Logo"
									/>
								</a>
								<a
									href="https://www.linkedin.com/company/houseofcybersecurity"
									rel="noreferrer"
									target="_blank"
									title="LinkedIn LHC"
									className="text-capitalize">
									<i className="fab fa-linkedin-in Footer-network"/>
								</a>
							</div>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-2">
							<div className="row">
								<div className="col-md-12">
									<div className="Footer-link">
										<Link to="/#PageHomeAboutLHC">
											About us
										</Link>
									</div>
									<div className="Footer-link">
										<Link to="/news">
											News
										</Link>
									</div>
									<div className="Footer-link">
										<Link to="/events">
											Events
										</Link>
									</div>
									<div className="Footer-link">
										<Link to="/#PageHomeServices">
											Services
										</Link>
									</div>
									<div className="Footer-link">
										<Link to="/contact">
											Contact us
										</Link>
									</div>
									<br/>
									<br/>
									<div className="Footer-link">
										<a
											href="https://circl.lu/report/"
											target="_blank"
											rel="noreferrer">
											Report an incident
										</a>
									</div>
									{getCounterService(this.props.services)
										&& <div className="Footer-link">
											<a>
												<Link to={"/service/" + getCounterService(this.props.services).handle}>
													Need help?
												</Link>
											</a>
										</div>
									}
									<div className="Footer-link">
										<a
											href="https://www.cybersecurity.lu/ecosystem"
											target="_blank"
											rel="noreferrer">
											Discover the ecosystem
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-2">
							<div className="row">
								<div className="col-md-12">
									<div className="Footer-title">Centres</div>
									<br/>
									<div className="Footer-link">
										<a
											href="https://www.circl.lu/"
											rel="noreferrer"
											target="_blank"
											className="text-capitalize">
											CIRCL
										</a>
									</div>
									<div className="Footer-link">
										<a
											href="https://www.nc3.lu/"
											rel="noreferrer"
											target="_blank"
											className="text-capitalize">
											NC3
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-2">
							<div className="row row-spaced">
								<div className="col-md-12">
									<div className="Footer-title">Shareholders</div>
									<br/>
									<div className="Footer-link">
										<a
											href="https://www.syvicol.lu/"
											rel="noreferrer"
											target="_blank"
											className="text-capitalize">
											SYVICOL
										</a>
									</div>
									<div className="Footer-link">
										<a
											href="https://mfamigr.gouvernement.lu/fr.html"
											rel="noreferrer"
											target="_blank"
											className="text-capitalize">
											MFAMIGR
										</a>
									</div>
									<div className="Footer-link">
										<a
											href="https://menej.gouvernement.lu/"
											rel="noreferrer"
											target="_blank"
											className="text-capitalize">
											MENEJ
										</a>
									</div>
									<div className="Footer-link">
										<a
											href="https://meco.gouvernement.lu/"
											rel="noreferrer"
											target="_blank"
											className="text-capitalize">
											MECO
										</a>
									</div>
									<div className="Footer-link">
										<a
											href="https://www.sigi.lu/"
											rel="noreferrer"
											target="_blank"
											className="text-capitalize">
											SIGI
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-2">
							<img
								className={"Footer-logo-cyberlux"}
								src="/img/cyberlux-logo-white.png"
								alt="CYBERLUX Logo"
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
