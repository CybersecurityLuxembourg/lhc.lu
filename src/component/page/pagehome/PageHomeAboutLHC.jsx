import React from "react";
import "./PageHomeAboutLHC.css";
import { getApiURL } from "../../../utils/env.jsx";
import Graph from "react-graph-vis";

export default class PageHomeAboutLHC extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			network: null,
			data: {
				nodes: [
					{
						id: -1,
						title: "",
						shape: "image",
						image: "/img/lhc-logo-full.png",
						size: 30,
						chosen: false,
					},
					this.getTextNode(10, "Economy"),
					this.getTextNode(11, "Citizens"),
					this.getTextNode(12, "Industry"),
					this.getTextNode(13, "Education"),
					this.getTextNode(14, "Municipalities"),
					this.getTextNode(15, "Health"),
					this.getTextNode(16, "Defence"),
					this.getTextNode(17, "Research"),
					this.getTextNode(18, "and more..."),

					this.getImageNode(100, "/img/circl.png", "https://www.circl.lu", 30),
					this.getImageNode(101, "/img/nc3.png", "https://www.circl.lu", 30),
					this.getImageNode(102, "/img/beesecure.png", "https://www.bee-secure.lu"),
					this.getImageNode(103, "/img/dih.png", "https://www.dih.lu"),
					this.getImageNode(104, "/img/dlh.png", "https://dlh.lu"),
					this.getImageNode(105, "/img/sigi.png", "https://www.sigi.lu"),
					this.getImageNode(106, "/img/esante.png", "https://www.esante.lu", 25),
					this.getImageNode(107, "/img/defence.png", "https://defense.gouvernement.lu"),
					this.getImageNode(108, "/img/snt.jpg", "https://wwwfr.uni.lu"),
				],
				edges: [
					this.getEdge(-1, 10, true),
					this.getEdge(-1, 11, true),
					this.getEdge(-1, 12, true),
					this.getEdge(-1, 13, true),
					this.getEdge(-1, 14, true),
					this.getEdge(-1, 15, true),
					this.getEdge(-1, 16, true),
					this.getEdge(-1, 17, true),
					this.getEdge(-1, 18, true),

					this.getEdge(10, 100),
					this.getEdge(10, 101),
					this.getEdge(11, 102),

					this.getEdge(12, 103),
					this.getEdge(13, 104),
					this.getEdge(14, 105),
					this.getEdge(15, 106),
					this.getEdge(16, 107),
					this.getEdge(17, 108),
				],
			}
		}
	}

	componentDidMount() {
		window.addEventListener('resize', () => {
			if (this.state.network) {
				this.state.network.redraw();
			}
		});
	}

	getTextNode(id, title) {
		return {
			id,
			title,
			label: "<b>" + title + "</b>",
			color: { border: "white", background: "#193c6d" },
			font: { color: "white", size: 22 },
			shape: "box",
			chosen: false,
		};
	}

	getImageNode(id, img, link, size) {
		return {
			id,
			title: "",
			shape: "image",
			image: img,
			chosen: false,
			link,
			borderWidth: 10,
			size: size || 40,
			shapeProperties: { useBorderWithImage: true },
			color: {
				border: "white",
				background: "white",
				radius: 10,
			},
		};
	}

	getEdge(id1, id2, transparent=false) {
		return {
			from: id1,
			to: id2,
			color: {
				color: transparent ? "transparent" : "white",
			},
			chosen: false,
			width: 2,
			smooth: {
				enabled: true,
				type: "curvedCCW",
				roundness: .1,
			},
		};
	}

	render() {
		const options = {
			physics: {
				barnesHut: {
					springLength: 120,
					springConstant: .2,
				}
			},
			layout: {
			},
			interaction: {
				zoomView: false,
				dragNodes: false,
				dragView: false,
			},
			nodes: {
				margin: {
					top: 5,
					bottom: 5,
					left: 20,
					right: 20,
				},
				font: {
					multi: "html",
				},
			},
			edges: {
				color: "#000000",
			},
			height: "600px",
		};

		const events = {
			select: ({ nodes, edges }) => {
				const selectedNode = this.state.data.nodes
					.filter((n) => n.id === nodes[0])
					.pop();

				if (selectedNode && selectedNode.link) {
					window.open(selectedNode.link);
				}
			},
	    }

		return <div id="PageHomeAboutLHC" className="PageHome-section">
			<div className="page max-sized-page">
				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>About LHC</h1>
					</div>

					<div className="col-md-5 row-spaced">
						<img
							src={"/img/lhc-about-logo.png"}
							alt="LHC about logo"
						/>
					</div>

					<div className="col-md-1"/>

					<div className="col-md-6 row-spaced">
						<h2>Make Luxembourg a pioneer in the open cybersecurity data economy</h2>

						<p>Luxembourg House of Cybersecurity is the backbone of leading-edge cyber
						resilience in Luxembourg and aims at capitalising on and further developing
						innovation, competencies, collaboration and capacity building.</p>

						<p>LHC is home to all types of cybersecurity-related activities and
						together with its two hosted centres CIRCL (Computer Incident Response
						Center Luxembourg) and NC3 (National Cybersecurity Competence Center) as
						well as its following partners, support, foster and serve:</p>
					</div>

					<div className="col-md-12">
						<Graph
							graph={this.state.data}
							options={options}
							events={events}
							getNetwork={network => {
								this.setState({ network })
							}}
						/>
					</div>
				</div>
			</div>
		</div>;
	}
}
