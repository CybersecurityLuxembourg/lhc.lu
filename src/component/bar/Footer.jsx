import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { getCounterService } from "../../utils/service.jsx";

export default class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div id="Footer" aria-label="Footer">
				<div className="Footer-content">
					<div className="row">
						<div className="col-md-2 Footer-contact">
							<div className="row">
								<img
									className={"Footer-logo"}
									src="/img/lhc-logo-white.png"
									alt="LHC Logo (footer, white on black)"
								/>
								<div>122 rue Adolphe Fischer</div>
								<div>L-1521 Luxembourg</div>
								<br/>
								<br/>
								<div>(+352) 274 00 98 601</div>
							</div>

							<div className="row">
								<div className="Footer-link">
									<a href="mailto:info@lhc.lu">info@lhc.lu</a>
								</div>
							</div>

							<div className="row">
								<div className="Footer-link">
									<a
										href="https://circl.lu/report/"
										target="_blank"
										className="text-capitalize"
										rel="noreferrer noopener">
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
										className="text-capitalize"
										rel="noreferrer noopener">
										Discover the ecosystem
									</a>
								</div>
							</div>
						</div>

						<div className="col-md-1"/>
						<div className="col-md-9">
							<div className="col-md-11">
								<div className="row flex-links">
									<div className="Footer-link">
										<Link to="/about">
											About us
										</Link>
									</div>
									<div className="Footer-link">
										<Link to="/legal">
											Governance
										</Link>
									</div>
									<div className="Footer-link">
										<Link to="/legal">
											Legal
										</Link>
									</div>
									<div className="Footer-link">
										<Link to="/services">
											Services
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
										<Link to="/contact">
											Contact us
										</Link>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<div className="row Footer-center-logos">
										<div className="col-md-3">
											<div className="Footer-link">
												<a href="https://www.nc3.lu" target="_blank" rel="noopener noreferrer">
													<img
														src="/img/nc3-lu-horizontal-negative.svg"
														alt="NC3 logo"
														height="64"
													/>
												</a>
											</div>
										</div>

										<div className="col-md-3">
											<div className="Footer-link">
												<a href="https://www.circl.lu" target="_blank"
												   rel="noopener noreferrer">
													<img
														src="/img/circl-lu-logo-white.svg"
														alt="CIRCL logo"
													 	height="64"
													/>
												</a>
											</div>
										</div>
										<div className="col-md-3">
											<div className="Footer-link">
												<img
													src="/img/luxembourg-cybersecurity-factory-logo-white-rgb.svg"
													alt="LUXEMBOURG CYBERSECURITY FACTORY logo" height="64"
												/>
											</div>
										</div>
										<div className="col-md-3">
											<div className="Footer-link">
												<Link to="/lucya">
													<img src="/img/lucya-logo-white.svg" alt="LUCYA logo" height="64"/>
												</Link>
											</div>
										</div>
									</div>
									<div className="row">
									</div>
								</div>

							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-4"/>
						<div className="col-md-3">

							<div className="Footer-link">
								<a
									href={"https://api.cybersecurity.lu/public/get_public_document/LHC_Legal_Notice.pdf"}
									rel="noreferrer noopener"
									target="_blank"
									title="Terms of use">
									Terms of Service
								</a>
								<span className={'mx-2 text-dark'}>|</span>
								<a
									href={"https://api.cybersecurity.lu/public/get_public_document/LHC_Legal_Notice.pdf"}
									rel="noreferrer noopener"
									target="_blank"
									title="Terms of use">
									Privacy Policy
								</a>
							</div>

						</div>

						<div className="col-md-3"/>

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
