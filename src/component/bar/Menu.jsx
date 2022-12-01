import React from "react";
import "./Menu.css";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

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
	}

	// eslint-disable-next-line class-methods-use-this
	getNavBar() {
		return <Nav className="mr-sm-2 ml-auto">
			<Nav.Link>
				<Link to="/">
					<div className="Menu-title">About LHC</div>
				</Link>
			</Nav.Link>

			<NavDropdown
				title={
					<div className="Menu-item">
						<div className="Menu-title">News & events</div>
						<i className="fas fa-sort-down"/>
					</div>
				}
				id="basic-nav-dropdown">
				<div className="row">
					<div className="col-sm-6">
						News

						<NavDropdown.Item>
							<Link to="/news">
								<div className="Menu-title">Latest News</div>
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to="/ltac">
								<div className="Menu-title">Lëtz Talk About Cyber</div>
							</Link>
						</NavDropdown.Item>
					</div>
					<div className="col-sm-6">
						Events

						<NavDropdown.Item>
							<Link to="/events">
								<div className="Menu-title">Upcoming Events</div>
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to="/breakfast">
								<div className="Menu-title">Cybersecurity Breakfast</div>
							</Link>
						</NavDropdown.Item>
					</div>
				</div>
			</NavDropdown>

			<NavDropdown
				title={
					<div className="Menu-item">
						<div className="Menu-title">Service & Facilities</div>
						<i className="fas fa-sort-down"/>
					</div>
				}
				id="basic-nav-dropdown">
				<div className="row">
					<div className="col-sm-4">
						Services

						<NavDropdown.Item>
							<Link to="/test-lab">
								<div className="Menu-title">Test Lab</div>
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to="/ltac">
								<div className="Menu-title">ROOM#42</div>
							</Link>
						</NavDropdown.Item>

						One-stop counter

						<a
							className="dropdown-item"
							href="https://www.bee-secure.lu/"
							target="_blank"
							rel="noreferrer">
							<div className="Menu-title">BEE SECURE</div>
						</a>
						<a
							className="dropdown-item"
							href="https://www.dlh.lu/"
							target="_blank"
							rel="noreferrer">
							<div className="Menu-title">Digital Learning Hub</div>
						</a>

						<NavDropdown.Item>
							<Link to="/ltac">
								<div className="Menu-title">Startups</div>
							</Link>
						</NavDropdown.Item>
					</div>
					<div className="col-sm-4">
						Facilities

						<NavDropdown.Item>
							<Link to="/meetings">
								<div className="Menu-title">Meetings, Training & Events</div>
							</Link>
						</NavDropdown.Item>
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
								src="/img/lhc-logo.png"
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
							<Nav.Link>
								<Link to="/report">
									<div className="Menu-title">Report an incident</div>
								</Link>
							</Nav.Link>
							<Nav.Link>
								<Link to="/help">
									<div className="Menu-title">Need help?</div>
								</Link>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				{this.state.showFlyingMenu
					&& <div className={"Menu-flying-menu-wrapper"}>
						<div className="Menu-flying-menu max-sized-page">
							<Link to="/">
								<img
									className="logo"
									src="/img/lhc-logo.jpg"
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
