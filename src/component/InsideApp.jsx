import React from "react";
import "./InsideApp.css";
import {
	Route, Switch, withRouter,
} from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import GovBar from "./bar/GovBar.jsx";
import Menu from "./bar/Menu.jsx";
import Footer from "./bar/Footer.jsx";
import PageHome from "./page/PageHome.jsx";
import PageAbout from "./page/PageAbout.jsx";
import PageNews from "./page/PageNews.jsx";
import PageSearch from "./page/PageSearch.jsx";
import Page404 from "./page/Page404.jsx";

class InsideApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			analytics: null,
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

	componentWillUnmount() {
		this.state.unlisten();
	}

	componentDidMount() {
		this.getAnalytics();
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
					analytics={this.state.analytics}
					{...props}
				/>}/>

				<div id="InsideApp-content">
					<Switch>
						{/* <Route path="/news/:handle" render={(props) => <PageNewsArticle {...props} />}/> */}

						<Route
							path="/news"
							render={(props) => <PageNews
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/about"
							render={(props) => <PageAbout
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/search"
							render={(props) => <PageSearch
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							exact
							path="/"
							render={(props) => <PageHome
								analytics={this.state.analytics}
								{...props}
							/>}
						/>

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
