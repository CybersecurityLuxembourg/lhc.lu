import React from "react";
import "./PageContact.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Banner from "../bar/Banner.jsx";
import GlobalMap from "../map/GlobalMap.jsx";

export default class PageContact extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageContact"}>
				<Banner
					image={"/img/banner-contact.jpg"}
				/>

				<div className="page max-sized-page">
					<div className="row row-spaced">
						<div className="col-md-12">
							<Breadcrumb>
								<Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
								<Breadcrumb.Item><Link to="/contact">Contact us</Link></Breadcrumb.Item>
							</Breadcrumb>
						</div>
					</div>
				</div>

				<div className={"PageContact-content"}>
					<div className="page max-sized-page">
						<div className="row row-spaced">
							<div className="col-md-5 offset-md-7 row-spaced">
								<h1>Contact us</h1>
							</div>
						</div>

						<div className="row row-spaced">
							<div className="col-md-5">
								<img
									src={"/img/lhc-office.jpg"}
									alt="LHC office"
								/>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-6 row-spaced">
								<div className="row">
									<div className="col-md-6 offset-md-3">
										<img
											src={"/img/lhc-logo-full.png"}
											alt="LHC office"
										/>
									</div>
								</div>
								<h3>LHC - Luxembourg House of Cybersecurity</h3>
								<br/>
								<div>122, Rue Adolphe Fischer, L-1521 Luxembourg</div>
								<div><a href="mailto:info@lhc.lu">info@lhc.lu</a></div>
								<div>(+352) 274 00 98 601</div>
							</div>
						</div>

						<div className="row row-spaced">
							<div className="col-md-12 row-spaced centered">
								<h2>Our centres</h2>
							</div>

							<div className="col-md-6 row-spaced">
								<div className="row">
									<div className="col-md-6 offset-md-3">
										<img
											src={"/img/circl-logo.png"}
											alt="CIRCL logo"
										/>
									</div>
								</div>
								<h3>CIRCL – Computer Incident Response Center Luxembourg</h3>
								<br/>
								<div>122, Rue Adolphe Fischer, L-1521 Luxembourg</div>
								<div><a href="mailto:info@circl.lu">info@circl.lu</a></div>
								<div>GPG fingerprint: CA57 2205 C002 4E06 BA70 BE89 EAAD CFFC 22BD 4CD5</div>
								<div>(+352) 247 88444</div>
							</div>

							<div className="col-md-6 row-spaced">
								<div className="row">
									<div className="col-md-6 offset-md-3">
										<img
										src={"/img/nc3-logo.png"}
										alt="NC3 logo"
									/>
									</div>
								</div>
								<h3>NC3 – National Cybersecurity Competence Center</h3>
								<br/>
								<div>122, Rue Adolphe Fischer, L-1521 Luxembourg</div>
								<div><a href="mailto:info@nc3.lu">info@nc3.lu</a></div>
								<div>(+352) 274 00 98 667</div>
							</div>
						</div>

						<div className="row row-spaced">
							<div className="col-md-12 row-spaced centered">
								<h2>How to reach us</h2>
							</div>

							<div className="col-md-6 row-spaced">
								<div><i className="fas fa-chevron-circle-right"/> by Car</div>
								<div><b>Closest Parkings:</b></div>
								<div>Parking Fort Wedell</div>
								<div>Bouillon P+R (24h free parking)</div>
								<div>Parking de la Gare</div>
								<br/>
								<div><i className="fas fa-chevron-circle-right"/> by Bus</div>
								<div><b>Closest bus stops:</b></div>
								<div>Hollerich, Fonderie: 4, 10, 14, 20, 27, 94, 603</div>
								<div>Centre, Adolphe Fischer: 19</div>
								<br/>
								<div><i className="fas fa-chevron-circle-right"/> by Bike</div>
								<div><b>Closest vel'OH station:</b></div>
								<div>vel'OH station n°3 Stroossbuerger Plaz - Place de Strasbourg</div>
							</div>

							<div className="col-md-6 row-spaced">
								<GlobalMap/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
