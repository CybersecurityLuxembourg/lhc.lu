import React from "react";
import "./DialogConfirmation.css";
import Popup from "reactjs-popup";

export default class DialogConfirmation extends React.Component {
	constructor(props) {
		super(props);

		this.afterConfirmation = this.afterConfirmation.bind(this);
		this.cancel = this.cancel.bind(this);

		this.state = {
			open: false,
		};
	}

	afterConfirmation() {
		this.props.afterConfirmation();
		this.setState({ open: false });
	}

	cancel() {
		this.setState({ open: false });
	}

	render() {
		return (
			<Popup
				trigger={this.props.trigger}
				modal
				closeOnDocumentClick
				className={"DialogConfirmation"}
				open={this.state.open}
			>
				<div className={"DialogConfirmation-wrapper"}>
					<h2>{this.props.text}</h2>
					<div className={"bottom-right-buttons"}>
						<button
							className={"grey-background"}
							data-hover="Cancel"
							data-active=""
							onClick={this.cancel}>
							<span><i className="far fa-times-circle"/> Cancel</span>
						</button>
						<button
							data-hover="Yes"
							data-active=""
							onClick={this.afterConfirmation}>
							<span><i className="far fa-check-circle"/> Yes</span>
						</button>
					</div>
				</div>
			</Popup>
		);
	}
}
