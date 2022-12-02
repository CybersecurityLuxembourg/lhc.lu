import React from "react";
import "./PageHomeNews.css";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import Loading from "../../box/Loading.jsx";
import NoImage from "../../box/NoImage.jsx";
import Message from "../../box/Message.jsx";
import SmallArticle from "../../item/SmallArticle.jsx";

export default class PageHomeNews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			news: null,
			selectedNews: 0,
		};
	}

	componentDidMount() {
		this.getNews();

		this.setState({
			timer: setInterval(() => {
				this.changeNews();
			}, 5000),
		});
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.lhc && this.props.lhc) {
			this.getNews();
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.newsTimer);
	}

	getNews() {
		if (this.props.lhc) {
			const params = {
				entities: this.props.lhc.id,
				type: "NEWS",
				per_page: 3,
			};

			getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
				this.setState({
					news: data.items,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	changeNews() {
		if (this.state.news) {
			if (this.state.selectedNews === null) {
				this.setState({ selectedNews: 0 });
			} else if (this.state.news.length <= this.state.selectedNews + 1) {
				this.setState({ selectedNews: 0 });
			} else {
				this.setState({ selectedNews: this.state.selectedNews + 1 });
			}
		}
	}

	render() {
		if (!this.state.news) {
			return <div className={"col-md-12"}>
				<Loading
					height={300}
				/>
			</div>;
		}

		if (this.state.news.length === 0) {
			return <div className={"col-md-12"}>
				<Message
					content={"No news found"}
					height={300}
				/>
			</div>;
		}

		return <div id="PageHomeNews" className="PageHome-section">
			<div className="page max-sized-page">
				<div className="row row-spaced">
					<div className={"col-md-12"}>
						<h1>News & Events</h1>
					</div>
				</div>

				<div className="row row-spaced">
					<div className={"col-md-3"}>
						<div className={"PageHomeNews-image"}>
							{this.state.news[this.state.selectedNews].image
								? <img
									src={getApiURL() + "public/get_public_image/"
										+ this.state.news[this.state.selectedNews].image}
									alt="Article image"/>
								: <NoImage/>
							}
						</div>
					</div>

					<div className={"col-md-1"}/>

					<div className={"col-md-8"}>
						<h2>Latest news</h2>

						<div className={"row"}>
							{this.state.news.map((c, i) => <div
								key={c.id}
								className={"col-md-12"}>
								<SmallArticle
									info={c}
								/>
							</div>)}
						</div>

						<div className={"row"}>
							<div className={"col-md-8"}>
								<Link
									to={"/news"}
									className="Article-link">
									<b>See all</b>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>;
	}
}
