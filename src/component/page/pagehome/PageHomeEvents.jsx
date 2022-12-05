import React from "react";
import "./PageHomeEvents.css";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import { getApiURL } from "../../../utils/env.jsx";
import { dateToString } from "../../../utils/date.jsx";
import Loading from "../../box/Loading.jsx";
import NoImage from "../../box/NoImage.jsx";
import Message from "../../box/Message.jsx";
import SmallArticle from "../../item/SmallArticle.jsx";

export default class PageHomeEvents extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			events: null,
			selectedEvent: 0,
		};
	}

	componentDidMount() {
		this.getEvents();

		this.setState({
			timer: setInterval(() => {
				this.changeEvent();
			}, 5000),
		});
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.lhc && this.props.lhc) {
			this.getEvents();
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.newsTimer);
	}

	getEvents() {
		if (this.props.lhc) {
			const params = {
				entities: this.props.lhc.id,
				type: "EVENT",
				per_page: 3,
				min_end_date: dateToString(new Date()),
				order_by: "start_date",
				order: "asc",
			};

			getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
				this.setState({
					events: data.items,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	changeEvent() {
		if (this.state.events) {
			if (this.state.selectedEvent === null) {
				this.setState({ selectedEvent: 0 });
			} else if (this.state.events.length <= this.state.selectedEvent + 1) {
				this.setState({ selectedEvent: 0 });
			} else {
				this.setState({ selectedEvent: this.state.selectedEvent + 1 });
			}
		}
	}

	getBoxContent(article, i) {
		return <div className={"PageHomeLatestNews-article "
			+ (this.state.selectedEvent === i && "PageHomeLatestNews-article-selected")}>
			<div className={"PageHomeLatestNews-date"}>
				{article.publication_date.split("T")[0]}&nbsp;-&nbsp;
			</div>
			<div className={"PageHomeLatestNews-title"}>
				{article.title}
			</div>
		</div>;
	}

	render() {
		return <div id="PageHomeEvents" className="PageHome-section">
			<div className="page max-sized-page">
				{!this.state.events
					&& <div className="row row-spaced">
						<div className={"col-md-12"}>
							<Loading
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.events && this.state.events.length === 0
					&& <div className="row row-spaced">
						<div className={"col-md-12"}>
							<Message
								content={"No event found"}
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.events && this.state.events.length > 0
					&& <div className="row row-spaced">
						<div className={"col-md-8"}>
							<h2>Upcoming events</h2>

							<div className={"row"}>
								{this.state.events.map((c, i) => <div
									key={c.id}
									className={"col-md-12"}>
									<SmallArticle
										info={c}
									/>
								</div>)}
							</div>
						</div>

						<div className={"col-md-1"}/>

						<div className={"col-md-3"}>
							<div className={"PageHomeEvents-image"}>
								{this.state.events[this.state.selectedEvent].image
									? <img
										src={getApiURL() + "public/get_public_image/"
											+ this.state.events[this.state.selectedEvent].image}
										alt="Article image"/>
									: <NoImage/>
								}
							</div>
						</div>
					</div>
				}
			</div>
		</div>;
	}
}
