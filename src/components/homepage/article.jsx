import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "./styles/article.css";

const Article = (props) => {
	const { title, description, date, link } = props;

	return (
		<React.Fragment>
			<Link to={link}>
			<div className="homepage-article">
				<div className="homepage-article-content">
				
					<div style={{ float: "left" }}>
						<div className="homepage-article-date">|&nbsp;&nbsp;&nbsp;{date}</div>
						<div className="homepage-article-title">{title}</div>
						<div className="homepage-article-description">{description}</div>
					</div>
					<div className="homepage-article-link" style={{ float: "right" }}>
						<Link to={link}>
							<FontAwesomeIcon style={{ fontSize: "20px" }} icon={faChevronRight}/>
						</Link>
					</div>
					
				</div>
				
			</div>
			</Link>
		</React.Fragment>
	);
};

export default Article;
