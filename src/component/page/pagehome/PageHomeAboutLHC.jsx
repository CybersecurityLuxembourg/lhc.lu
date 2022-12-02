import React from "react";
import "./PageHomeAboutLHC.css";
import { getApiURL } from "../../../utils/env.jsx";

export default class PageHomeAboutLHC extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div id="PageHomeAboutLHC" className="PageHome-section">
			<div className="page max-sized-page">
				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>About LHC</h1>
					</div>

					<div className="col-md-3">
						<img
							src={getApiURL() + "public/get_public_image/logo.png"}
							alt="Please configure logo"
						/>
					</div>

					<div className="col-md-1"/>

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
