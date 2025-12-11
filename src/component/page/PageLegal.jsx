import React from 'react';
import './PageLegal.css';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

export default class PageLegal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div id="PageLegal">
				<div className="top-separator"/>
				<div className="page max-sized-page">

					<div className="row row-spaced">
						<div className="col-md-12">
							<Breadcrumb>
								<Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
								<Breadcrumb.Item><Link to="/">The Agency</Link></Breadcrumb.Item>
								<Breadcrumb.Item><Link to="/#PageHomeAboutLHC">About us</Link></Breadcrumb.Item>
								<Breadcrumb.Item active>Legal</Breadcrumb.Item>
							</Breadcrumb>
						</div>
					</div>

					<h1>Legal</h1>

					<div className="item-list">

						<a
							href="https://api.cybersecurity.lu/public/get_public_document/GIE-contrat-constitutif_consolidated&public_version.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="item-link"
						>
							<div className="item">
								<div className="item-icon pdf">
									<i className="fas fa-file-pdf" aria-hidden="true"/>
								</div>
								<div className="item-title">
									Statutes
								</div>
								<div className="item-badge">
									PDF
								</div>
							</div>
						</a>

						<a
							href="https://lhc.lu/news/la-luxembourg-house-of-cybersecurity-annonce-la-nouvelle-composition-de-son-collge-de-grance"
							target="_blank"
							rel="noopener noreferrer"
							className="item-link"
						>
							<div className="item">
								<div className="item-icon">
									<i className="fas fa-link" aria-hidden="true"/>
								</div>
								<div className="item-title">
									Management Board
								</div>
								<div className="item-badge">
									Article
								</div>
							</div>

						</a>

						<a
							href="https://api.cybersecurity.lu/public/get_public_document/CoC_LHC.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="item-link"
						>
							<div className="item">
								<div className="item-icon">
									<i className="fas fa-file-pdf" aria-hidden="true"/>
								</div>
								<div className="item-title">
									Code of Conduct
								</div>
								<div className="item-badge">
									PDF
								</div>
							</div>
						</a>

						<a
							href="https://api.cybersecurity.lu/public/get_public_document/LHC_Legal_Notice.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="item-link"
						>
							<div className="item">
								<div className="item-icon">
									<i className="fas fa-file-pdf" aria-hidden="true"/>
								</div>
								<div className="item-title">Terms of Service & Privacy Policy
								</div>
								<div className="item-badge">
									PDF
								</div>
							</div>
						</a>

					</div>
				</div>
			</div>
		);
	}
}