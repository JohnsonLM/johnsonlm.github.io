import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import INFO from "../data/user";
import myPortfolio from "../data/portfolio";

import "./styles/readArticle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCube, 
	faGlobe, 
	faPenRuler
} from "@fortawesome/free-solid-svg-icons";


let ArticleStyle = styled.div``;

const SeePortfolio = () => {
	const navigate = useNavigate();
	let { slug } = useParams();

	const article = myPortfolio[slug - 1];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [article]);

	ArticleStyle = styled.div`
		${article().style}
	`;

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${article().title} | ${INFO.main.title}`}</title>
				<meta name="description" content={article().description} />
				<meta name="keywords" content={article().keywords.join(", ")} />
			</Helmet>

			<div className="page-content">
				<NavBar />

				<div className="content-wrapper">
					<div className="read-article-logo-container">
						<div className="read-article-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="read-article-container">
						<div className="read-article-back">
							<img
								src="../back-button.png"
								alt="back"
								className="read-article-back-button"
								onClick={() => navigate(-1)}
							/>
						</div>

						<div className="read-article-wrapper">
							<div className="title read-article-title">
								{article().type === "3D" && <FontAwesomeIcon icon={faCube}/>}
								{article().type === "Design" && <FontAwesomeIcon icon={faPenRuler}/>}
								{article().type === "Web" && <FontAwesomeIcon icon={faGlobe}/>}
								&nbsp;
								{article().title}
							</div>
							<div className="read-article-body">
								<ArticleStyle>{article().description}</ArticleStyle>
								<br/>
								{article().videos.map((video, index) => (
									<video className="image" type="video/mp4" controls src={"." + video}/>
								))}
								{article().images.map((image, index) => (
									<img className="image" src={"." + image} alt={image}/>
								))}
							</div>
						</div>
					</div>
					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default SeePortfolio;
