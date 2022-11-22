import React from "react";
import "./Menu.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import SearchField from "../form/SearchField.jsx";

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
					<div className="Menu-title">Home</div>
					<div className="Menu-description">text</div>
				</Link>
			</Nav.Link>

			<Nav.Link>
				<Link to="/news">
					<div className="Menu-title">News</div>
					<div className="Menu-description">text</div>
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
							<SearchField/>
							<Nav.Link>
								<Link to="/about">
									<div className="Menu-title">About</div>
									<div className="Menu-description">text</div>
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
