import React from "react";
import "./PageHomeAboutLHC.css";
import { getApiURL } from "../../../utils/env.jsx";

export default class PageHomeAboutLHC extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div id="PageHomeAboutLHC" className="PageHome-section">
			<div className="page max-sized-page">
				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>About LHC</h1>
					</div>

					<div className="col-md-3">
						<img
							src={"/img/lhc-about-logo.png"}
							alt="LHC about logo"
						/>
					</div>

					<div className="col-md-1"/>

					<div className="col-md-8">
						<h2>Make Luxembourg a pioneer in the open cybersecurity data economy</h2>

						<p>Luxembourg House of Cybersecurity is the backbone of leading-edge cyber
						resilience in Luxembourg and aims at capitalising on and further developing
						innovation, competencies, collaboration and capacity building.</p>

						<p>LHC is home to all types of cybersecurity-related activities and
						together with its two hosted centres CIRCL (Computer Incident Response
						Center Luxembourg) and NC3 (National Cybersecurity Competence Center) as
						well as its following partners, support, foster and serve:</p>
					</div>
				</div>
			</div>
		</div>;
	}
}
