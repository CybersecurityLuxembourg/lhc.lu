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
			lat: 49.8116,
			lng: 6.1319,
			zoom: 9,
		};
	}

	render() {
		return (
			<div className={"GlobalMap"}>
				<MapContainer
					center={[this.state.lat, this.state.lng]}
					zoom={this.state.zoom}
					style={{ width: "100%", height: "100%" }}
				>
					<Marker
						position={[this.state.lat, this.state.lng]}>
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
