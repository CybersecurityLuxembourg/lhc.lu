import React from "react";
import "./GlobalMap.css";
import {
	MapContainer, TileLayer, Marker, Popup,
} from "react-leaflet";
import L from "leaflet";
import _ from "lodash";

export default class GlobalMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			lat: 49.599720,
			lng: 6.127930,
			zoom: 13,
		};
	}

	render() {
		const thisIcon = new L.Icon({
			iconUrl: "/img/logo.png",
			iconSize: [24, 24],
			iconAnchor: [12, 36],
			popupAnchor: [0, -36],
		});

		return (
			<div className={"GlobalMap"}>
				<MapContainer
					center={[this.state.lat, this.state.lng]}
					zoom={this.state.zoom}
					style={{ width: "100%", height: "100%" }}
				>
					<Marker
						position={[this.state.lat, this.state.lng]}
						icon={thisIcon}>
					</Marker>

					<TileLayer
						attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</MapContainer>
			</div>
		);
	}
}
