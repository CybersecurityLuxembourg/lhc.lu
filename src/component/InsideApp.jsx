import React from "react";
import "./InsideApp.css";
import {
	Route, Switch, withRouter, Redirect
} from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import GovBar from "./bar/GovBar.jsx";
import Menu from "./bar/Menu.jsx";
import Footer from "./bar/Footer.jsx";
import PageHome from "./page/PageHome.jsx";
import PageContact from "./page/PageContact.jsx";
import PageHelp from "./page/PageHelp.jsx";
import PageNews from "./page/PageNews.jsx";
import PageEvents from "./page/PageEvents.jsx";
import PageArticle from "./page/PageArticle.jsx";
import PageLTAC from "./page/PageLTAC.jsx";
import PageBreakfast from "./page/PageBreakfast.jsx";
import Page404 from "./page/Page404.jsx";

class InsideApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			lhc: null,
			analytics: null,
			facilityServices: [
				"Meetings, Training & Events",
				"Startups"
			],
			unlisten: null,
		};
	}

	componentWillMount() {
		this.setState({
			unlisten: this.props.history.listen((location) => {
				// eslint-disable-next-line no-multi-assign,no-underscore-dangle
				const paq = window._paq = window._paq || [];
				paq.push(["setCustomUrl", location.pathname + location.search]);
				paq.push(["trackPageView"]);
			}),
		});
	}

	componentDidMount() {
		this.getAnalytics();
		this.getLHC();
	}

	componentWillUnmount() {
		this.state.unlisten();
	}

	getLHC() {
		getRequest.call(this, "public/get_public_entities?name=(LHC)", (data) => {
			if (data.length === 1) {
				this.setState({
					lhc: data[0],
				});
			} else if (data.length === 0) {
				nm.error("LHC data not found. Please contact administrators."); 
			} else {
				nm.error("Multiple entity found for LHC. Please contact administrators."); 
			}
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getAnalytics() {
		getRequest.call(this, "public/get_public_analytics", (data) => {
			this.setState({
				analytics: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	render() {
		return (
			<div id="InsideApp">
				<GovBar/>

				<Route path="/:path?" render={(props) => <Menu
					lhc={this.state.lhc}
					analytics={this.state.analytics}
					facilityServices={this.state.facilityServices}
					{...props}
				/>}/>

				<div id="InsideApp-content">
					<Switch>
						<Route path="/news/:handle" render={(props) => <PageArticle {...props} />}/>
						<Route path="/event/:handle" render={(props) => <PageArticle {...props} />}/>
						<Route path="/service/:handle" render={(props) => <PageArticle {...props} />}/>
						<Route path="/tool/:handle" render={(props) => <PageArticle {...props} />}/>

						<Route
							path="/news"
							render={(props) => <PageNews
								lhc={this.state.lhc}
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/events"
							render={(props) => <PageEvents
								lhc={this.state.lhc}
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/contact"
							render={(props) => <PageContact
								lhc={this.state.lhc}
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/help"
							render={(props) => <PageHelp
								lhc={this.state.lhc}
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							exact
							path="/"
							render={(props) => <PageHome
								lhc={this.state.lhc}
								analytics={this.state.analytics}
								facilityServices={this.state.facilityServices}
								{...props}
							/>}
						/>

						{/* REDIRECTIONS */}

						<Route exact path="/event">
							<Redirect to="/events" />
						</Route>

						<Route exact path="/service">
							<Redirect to="/#PageHomeServices" />
						</Route>

						{/* 404 */}

						<Route
							render={(props) => <Page404
								{...props}
							/>}
						/>
					</Switch>
				</div>

				<Footer/>
			</div>
		);
	}
}

export default withRouter(InsideApp);
