import React from "react";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import Article from "../item/Article.jsx";

export default function CallList({ items, analytics, itemProps = {}, loading = false, emptyText = "No call found" }) {
	if (loading) {
		return (
			<div className="row row-spaced">
				<div className="col-md-12">
					<Loading height={200} />
				</div>
			</div>
		);
	}

	if (!items || items.length === 0) {
		return (
			<div className="row row-spaced">
				<div className="col-md-12">
					<Message text={emptyText} height={200} />
				</div>
			</div>
		);
	}

	return (
		<div className="row row-spaced">
			{items.map((a) => (
				<div className="col-md-12" key={a.id}>
					<Article
						info={a}
						analytics={analytics}
						showStartAndEndDates={true}
						{...itemProps}
					/>
				</div>
			))}
		</div>
	);
}
