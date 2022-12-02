import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { getPrivateAppURL } from "../../utils/env.jsx";

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
								<a href="mailto:info@cybersecurity-luxembourg.com">info@cybersecurity-luxembourg.com</a>
							</div>
							<br/>
							<div>(+352) 274 00 98 601</div>
							<br/>
							<div className="Footer-network">
								<a
									href="https://twitter.com/cyberluxembourg"
									rel="noreferrer"
									target="_blank"
									title="Twitter CYBERLUX"
									className="text-capitalize">
									<i className="fab fa-twitter Footer-network"/>
								</a>
								<a
									href="https://www.linkedin.com/company/cybersecurity-luxembourg/"
									rel="noreferrer"
									target="_blank"
									title="LinkedIn CYBERLUX"
									className="text-capitalize">
									<i className="fab fa-linkedin-in Footer-network"/>
								</a>
								<a
									href="https://github.com/CybersecurityLuxembourg/"
									rel="noreferrer"
									target="_blank"
									title="GitHub CYBERLUX"
									className="text-capitalize">
									<i className="fab fa-github-alt Footer-network"/>
								</a>
							</div>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-2">
							<div className="row">
								<div className="col-md-12">
									<div className="Footer-link">
										<a
											href="https://hcpn.gouvernement.lu/en.html"
											rel="noreferrer"
											target="_blank"
											title="HCPN">
											About us
										</a>
									</div>
									<div className="Footer-link">
										<a
											href="https://lhc.lu/"
											rel="noreferrer"
											target="_blank"
											title="Luxembourg House of Cybersecurity"
											className="text-capitalize">
											Services & facilities
										</a>
									</div>
									<div className="Footer-link">
										<a
											href="https://www.luxinnovation.lu/"
											rel="noreferrer"
											target="_blank"
											title="LUXINNOVATION GIE"
											className="text-capitalize">
											News & events
										</a>
									</div>
									<div className="Footer-link">
										<a
											href="https://www.luxinnovation.lu/"
											rel="noreferrer"
											target="_blank"
											title="LUXINNOVATION GIE"
											className="text-capitalize">
											Contact us
										</a>
									</div>
									<br/>
									<br/>
									<div className="Footer-link">
										<a
											href="https://www.luxinnovation.lu/"
											rel="noreferrer"
											target="_blank"
											title="LUXINNOVATION GIE"
											className="text-capitalize">
											Report an incident
										</a>
									</div>
									<div className="Footer-link">
										<a
											href="https://www.luxinnovation.lu/"
											rel="noreferrer"
											target="_blank"
											title="LUXINNOVATION GIE"
											className="text-capitalize">
											Need help?
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
											href="https://www.luxinnovation.lu/"
											rel="noreferrer"
											target="_blank"
											title="LUXINNOVATION GIE"
											className="text-capitalize">
											CIRCL
										</a>
									</div>
									<div className="Footer-link">
										<a
											href="https://www.luxinnovation.lu/"
											rel="noreferrer"
											target="_blank"
											title="LUXINNOVATION GIE"
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
											href="https://www.luxinnovation.lu/"
											rel="noreferrer"
											target="_blank"
											title="LUXINNOVATION GIE"
											className="text-capitalize">
											SYVICOL
										</a>
									</div>
									<div className="Footer-link">
										<a
											href="https://www.luxinnovation.lu/"
											rel="noreferrer"
											target="_blank"
											title="LUXINNOVATION GIE"
											className="text-capitalize">
											MFAMIGR
										</a>
									</div>
									<div className="Footer-link">
										<a
											href="https://www.luxinnovation.lu/"
											rel="noreferrer"
											target="_blank"
											title="LUXINNOVATION GIE"
											className="text-capitalize">
											MENEJ
										</a>
									</div>
									<div className="Footer-link">
										<a
											href="https://www.luxinnovation.lu/"
											rel="noreferrer"
											target="_blank"
											title="LUXINNOVATION GIE"
											className="text-capitalize">
											MECO
										</a>
									</div>
									<div className="Footer-link">
										<a
											href="https://www.luxinnovation.lu/"
											rel="noreferrer"
											target="_blank"
											title="LUXINNOVATION GIE"
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
