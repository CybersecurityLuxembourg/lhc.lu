import React from "react";
import "./Menu.css";
import { NotificationManager as nm } from "react-notifications";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Message from "../box/Message.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";
import { getCyberluxPortalURL } from "../../utils/env.jsx";
import { getCounterService } from "../../utils/service.jsx";

export default class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showFlyingMenu: false,
			entities: null,
			relationshipTypes: null,
			relationships: null,
			entityOrder: ["(CIRCL)", "(NC3)"],
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

		this.getEntities();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.lhc && this.props.lhc) {
			this.getEntities();
		}
	}

	getEntities() {
		if (this.props.lhc) {
			getRequest.call(this, "public/get_public_entity_relationship_types", (data) => {
				this.setState({
					relationshipTypes: data,
				}, () => {
					const params = {
						ids: this.props.lhc.id,
					};

					getRequest.call(this, "public/get_public_entity_relationships?" + dictToURI(params), (data2) => {
						this.setState({
							relationships: data2,
						}, () => {
							const params = {
								ids: this.state.relationships
									.filter((r) => r.entity_id_2 === this.props.lhc.id)
									.filter((r) => r.type === this.state.relationshipTypes
										.filter((t) => t.name === "IS HOSTED BY")
										.map((t) => t.id)
										.pop())
									.map((r) => r.entity_id_1),
							};

							getRequest.call(this, "public/get_public_entities?" + dictToURI(params), (data3) => {
								this.setState({
									entities: data3.sort((a, b) => this.orderEntities(a, b)),
								});
							}, (response) => {
								nm.warning(response.statusText);
							}, (error) => {
								nm.error(error.message);
							});
						});
					}, (response) => {
						nm.warning(response.statusText);
					}, (error) => {
						nm.error(error.message);
					});
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	orderEntities(a, b) {
		const getPos = (title) => {
			for (let i = 0; i < this.state.entityOrder.length; i++) {
				if (title.includes(this.state.entityOrder[i])) {
					return i;
				}
			}

			return Number.MAX_SAFE_INTEGER;
		};

		if (getPos(a.name) !== getPos(b.name)) {
			return getPos(a.name) - getPos(b.name);
		}
		
		return a.name < b.name ? -1 : 1;
	}

	setHash(hash) {
		window.location.hash = hash;
	}

	getNavBar() {
		return <Nav className="mr-sm-2 ml-auto">
			<NavDropdown
				title={
					<div onClick={() => this.setHash("PageHomeAboutLHC")}>
						<Link to="/">
							<div className="Menu-title"><b>The Agency</b></div>
							<i className="fas fa-sort-down"/>
						</Link>
					</div>
				}
				id="basic-nav-dropdown"
				className="dropdown-agency"
				renderMenuOnMount={true}>
				<div className="row">
					<div className="col-sm-12">
						<div onClick={() => this.setHash("PageHomeAboutLHC")}>
							<NavDropdown.Item as={Link} to="/">
								<div className="Menu-title">About us</div>
							</NavDropdown.Item>
						</div>
						<NavDropdown.Item as={Link} to="/career">
							<div className="Menu-title">Career</div>
						</NavDropdown.Item>
						<NavDropdown.Item as={Link} to="/call">
							<div className="Menu-title">Call for projects/services</div>
						</NavDropdown.Item>
					</div>
				</div>
			</NavDropdown>

			<NavDropdown
				title={
					<div onClick={() => this.setHash("PageHomeServices")}>
						<Link to="/">
							<div className="Menu-title"><b>Services</b></div>
							<i className="fas fa-sort-down"/>
						</Link>
					</div>
				}
				id="basic-nav-dropdown"
				renderMenuOnMount={true}
				className="dropdown-service">
				<div className="row">
					<div className="col-sm-12">
						{this.props.services
							&& this.props.services.map((s) => (
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
						))}

						{!this.props.services
							&& <Message
								text={"No service found"}
								height={100}
							/>
						}
					</div>
				</div>
			</NavDropdown>

			<NavDropdown
				title={
					<div>
						<Link to="/">
							<div className="Menu-title"><b>Hosted by LHC</b></div>
							<i className="fas fa-sort-down"/>
						</Link>
					</div>
				}
				id="basic-nav-dropdown"
				renderMenuOnMount={true}
				className="dropdown-service">
				<div className="row">
					<div className="col-sm-12">
						{this.state.entities
							&& this.state.entities.map((s) => (
							<div>
								<a
									className="dropdown-item"
									href={getCyberluxPortalURL() + "entity/" + s.id}
									target="_blank"
									rel="noreferrer">
									<div className="Menu-title">{s.name}</div>
								</a>
							</div>
						))}

						{!this.state.entities
							&& <Message
								text={"No entity found"}
								height={100}
							/>
						}
					</div>
				</div>
			</NavDropdown>

			<Nav.Link>
				<Link to="/publications">
					<div className="Menu-title"><b>Publications</b></div>
				</Link>
			</Nav.Link>

			<NavDropdown
				title={
					<div onClick={() => this.setHash("PageHomeNews")}>
						<Link to="/">
							<div className="Menu-title"><b>News & events</b></div>
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
					<div className="Menu-title"><b>Contact us</b></div>
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
								<div className="Menu-title"><i className="fas fa-exclamation-triangle"/> Report an incident</div>
							</a>
							{getCounterService(this.props.services)
								&& <a className="nav-link">
									<Link to={"/service/" + getCounterService(this.props.services).handle}>
										<div className="Menu-title"><i className="fas fa-question-circle"/> Need help?</div>
									</Link>
								</a>
							}
							<a
								className="nav-link"
								href="https://www.cybersecurity.lu/ecosystem"
								target="_blank"
								rel="noreferrer">
								<div className="Menu-title"><i className="fas fa-search"/> Discover the ecosystem</div>
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
