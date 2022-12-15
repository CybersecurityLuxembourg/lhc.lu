import React from "react";
import "./Menu.css";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Message from "../box/Message.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showFlyingMenu: false,
		};
	}

	componentDidMount() {
		document.querySelector("#root").addEventListener("scroll", () => {
			const currentScrollPos = document.getElementById("root").scrollTop;

			if (currentScrollPos !== undefined && currentScrollPos !== 0) {
				if (currentScrollPos > 300 && !this.state.showFlyingMenu) {
					this.setState({ showFlyingMenu: true });
				} else if (currentScrollPos < 300) {
					this.setState({ showFlyingMenu: false });
				}
			}
		});

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

	setHash(hash) {
		window.location.hash = hash;
	}

	getNavBar() {
		return <Nav className="mr-sm-2 ml-auto">
			<a className="nav-link" onClick={() => this.setHash("PageHomeAboutLHC")}>
				<Link to="/">
					<div className="Menu-title">About LHC</div>
				</Link>
			</a>

			<NavDropdown
				title={
					<div onClick={() => this.setHash("PageHomeServices")}>
						<Link to="/">
							<div className="Menu-title">Services & Facilities</div>
							<i className="fas fa-sort-down"/>
						</Link>
					</div>
				}
				id="basic-nav-dropdown"
				renderMenuOnMount={true}
				className="dropdown-service">
				<div className="row">
					<div className="col-sm-4">
						Services

						{this.state.services
							&& this.state.services.items
								.filter((s) => this.props.facilityServices.indexOf(s.title) < 0)
								.map((s) => (
								<div>
									{s.link && s.link.length > 0
										? <a
											className="dropdown-item"
											href={s.link}
											target="_blank"
											rel="noreferrer">
											<div className="Menu-title">{s.title}</div>
										</a>
										: <NavDropdown.Item as={Link} to={"/service/" + s.handle}>
											<div className="Menu-title">{s.title}</div>
										</NavDropdown.Item>
									}
								</div>
							))
						}

						{!this.state.services
							&& <Message
								text={"No service found"}
								height={100}
							/>

						}
					</div>
					<div className="col-sm-4">
						Facilities

						{this.state.services
							&& this.state.services.items
								.filter((s) => this.props.facilityServices.indexOf(s.title) >= 0)
								.map((s) => (
								<div>
									{s.link && s.link.length > 0
										? <a
											className="dropdown-item"
											href={s.link}
											target="_blank"
											rel="noreferrer">
											<div className="Menu-title">{s.title}</div>
										</a>
										: <NavDropdown.Item as={Link} to={"/service/" + s.handle}>
											<div className="Menu-title">{s.title}</div>
										</NavDropdown.Item>
									}
								</div>
							))
						}
					</div>
					<div className="col-sm-4">
						Hosted by LHC

						<a
							className="dropdown-item"
							href="https://www.circl.lu/"
							target="_blank"
							rel="noreferrer">
							<div className="Menu-title">CIRCL</div>
						</a>
						<a
							className="dropdown-item"
							href="https://www.nc3.lu/"
							target="_blank"
							rel="noreferrer">
							<div className="Menu-title">NC3</div>
						</a>
					</div>
				</div>
			</NavDropdown>

			<a
				className="nav-link"
				href="https://www.cybersecurity.lu/ecosystem"
				target="_blank"
				rel="noreferrer">
				<div className="Menu-title">CYBERSECURITY Luxembourg Ecosystem</div>
			</a>

			<NavDropdown
				title={
					<div onClick={() => this.setHash("PageHomeNews")}>
						<Link to="/">
							<div className="Menu-title">News & events</div>
							<i className="fas fa-sort-down"/>
						</Link>
					</div>
				}
				id="basic-nav-dropdown"
				renderMenuOnMount={true}
				className="dropdown-news">
				<div className="row">
					<div className="col-sm-6">
						News

						<NavDropdown.Item as={Link} to="/news">
							<div className="Menu-title">Latest News</div>
						</NavDropdown.Item>
						<NavDropdown.Item as={Link} to="/news?filter=ltac">
							<div className="Menu-title">Lëtz Talk About Cyber</div>
						</NavDropdown.Item>
					</div>
					<div className="col-sm-6">
						Events

						<NavDropdown.Item as={Link} to="/events">
							<div className="Menu-title">Upcoming Events</div>
						</NavDropdown.Item>
						<NavDropdown.Item as={Link} to="/events?filter=cybersecurity breakfast">
							<div className="Menu-title">Cybersecurity Breakfast</div>
						</NavDropdown.Item>
					</div>
				</div>
			</NavDropdown>

			<Nav.Link>
				<Link to="/contact">
					<div className="Menu-title">Contact</div>
				</Link>
			</Nav.Link>
		</Nav>;
	}

	render() {
		return (
			<div className={"Menu page max-sized-page"}>
				<Navbar expand="lg">
					<Navbar.Brand>
						<Link to="/">
							<img
								className={"Menu-logo"}
								src="/img/lhc-logo-full.png"
								alt="LHC Logo"
							/>
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						{this.getNavBar()}
					</Navbar.Collapse>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="Menu-top-right-about mr-sm-2 ml-auto">
							<a
								className="nav-link"
								href="https://circl.lu/report/"
								target="_blank"
								rel="noreferrer">
								<div className="Menu-title">Report an incident</div>
							</a>
							<a
								className="nav-link"
								href="https://www.cybersecurity.lu/search"
								target="_blank"
								rel="noreferrer">
								<div className="Menu-title">Search for more</div>
							</a>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				{this.state.showFlyingMenu
					&& <div className={"Menu-flying-menu-wrapper"}>
						<div className="Menu-flying-menu max-sized-page">
							<Link to="/">
								<img
									className="logo"
									src="/img/lhc-logo-small.png"
									alt="LHC Logo"
								/>
							</Link>
							<div className="navbar navbar-nav">
								{this.getNavBar()}
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}
