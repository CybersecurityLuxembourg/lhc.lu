import React from "react";
import "./PageHomeServices.css";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import Loading from "../../box/Loading.jsx";
import NoImage from "../../box/NoImage.jsx";
import Message from "../../box/Message.jsx";
import { getApiURL } from "../../../utils/env.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import { dateToString } from "../../../utils/date.jsx";

export default class PageHomeServices extends React.Component {
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

	componentWillUnmount() {
		clearInterval(this.state.timer);
	}

	getNews() {
		const params = {
			type: "EVENT",
			ignored_taxonomy_values: "CSWL 2022",
			per_page: 5,
			order_by: "start_date",
			order: "asc",
			min_end_date: dateToString(new Date()),
		};

		getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
			this.setState({
				news: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	changeNews() {
		if (this.state.news) {
			if (this.state.selectedNews === null) {
				this.setState({ selectedNews: 0 });
			} else if (this.state.news.items.length <= this.state.selectedNews + 1) {
				this.setState({ selectedNews: 0 });
			} else {
				this.setState({ selectedNews: this.state.selectedNews + 1 });
			}
		}
	}

	render() {
		return <div id="PageHomeServices" className="PageHome-section">
			<div className="page max-sized-page">
				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Services & Facilites</h1>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-4">
						<h2>Services</h2>
					</div>

					<div className="col-md-8">
						<h2>Title text</h2>

						<p>Lorem ipsum dolor sit amet consectetur adipiscing elit morbi augue
						per ad integer, lobortis lacinia cursus justo fringilla viverra faucibus
						porttitor dapibus id venenatis. Gravida consequat placerat dictum
						suspendisse maecenas nascetur ad euismod class, semper condimentum
						rhoncus varius elementum nisi sapien montes nunc, dui faucibus
						fringilla vivamus vestibulum lacinia rutrum mattis.</p>

						<p>Scelerisque commodo proin aliquam dapibus vestibulum ornare
						himenaeos sem, id natoque taciti primis leo dictumst habitant, porta
						eget torquent accumsan semper mauris ad. Porttitor fames luctus
						venenatis primis varius elementum rutrum, auctor sodales nec cursus
						ornare facilisi consequat, aenean cras risus placerat donec
						pulvinar. In gravida mollis primis dignissim, cum massa pretium
						a aliquet, auctor turpis fermentum.</p>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-8">
						<h2>Title text</h2>

						<p>Lorem ipsum dolor sit amet consectetur adipiscing elit morbi augue
						per ad integer, lobortis lacinia cursus justo fringilla viverra faucibus
						porttitor dapibus id venenatis. Gravida consequat placerat dictum
						suspendisse maecenas nascetur ad euismod class, semper condimentum
						rhoncus varius elementum nisi sapien montes nunc, dui faucibus
						fringilla vivamus vestibulum lacinia rutrum mattis.</p>

						<p>Scelerisque commodo proin aliquam dapibus vestibulum ornare
						himenaeos sem, id natoque taciti primis leo dictumst habitant, porta
						eget torquent accumsan semper mauris ad. Porttitor fames luctus
						venenatis primis varius elementum rutrum, auctor sodales nec cursus
						ornare facilisi consequat, aenean cras risus placerat donec
						pulvinar. In gravida mollis primis dignissim, cum massa pretium
						a aliquet, auctor turpis fermentum.</p>
					</div>

					<div className="col-md-4">
						<h2>Services</h2>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-4">
						<h2>Services</h2>
					</div>

					<div className="col-md-8">
						<h2>Title text</h2>

						<p>Lorem ipsum dolor sit amet consectetur adipiscing elit morbi augue
						per ad integer, lobortis lacinia cursus justo fringilla viverra faucibus
						porttitor dapibus id venenatis. Gravida consequat placerat dictum
						suspendisse maecenas nascetur ad euismod class, semper condimentum
						rhoncus varius elementum nisi sapien montes nunc, dui faucibus
						fringilla vivamus vestibulum lacinia rutrum mattis.</p>

						<p>Scelerisque commodo proin aliquam dapibus vestibulum ornare
						himenaeos sem, id natoque taciti primis leo dictumst habitant, porta
						eget torquent accumsan semper mauris ad. Porttitor fames luctus
						venenatis primis varius elementum rutrum, auctor sodales nec cursus
						ornare facilisi consequat, aenean cras risus placerat donec
						pulvinar. In gravida mollis primis dignissim, cum massa pretium
						a aliquet, auctor turpis fermentum.</p>
					</div>
				</div>
			</div>
		</div>;
	}
}
