import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import INFO from "../data/user";
import SEO from "../data/seo";
import myPortfolio from "../data/portfolio";

import "./styles/portfolio.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube, faGlobe, faPenRuler } from "@fortawesome/free-solid-svg-icons";

const Portfolio = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "about");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`About | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="portfolio" />
				<div className="content-wrapper">
					<div className="about-logo-container">
						<div className="about-logo">
							<Logo width={46} />
						</div>
					</div>
					<div className="portfolio-container">
						<div className="portfolio-title">Portfolio</div>

						<div className="portfolio-items">
							{myPortfolio.map((item, index) => (
								<Link
									to={"/portfolio/" + (index + 1)}
									className="portfolio-link"
								>
									<div
										className="portfolio-item"
										style={{
											backgroundImage: `url(${
												item().background
											})`,
										}}
									>
										<div className="portfolio-item-title">
											{item().type === "3D" && (
												<FontAwesomeIcon
													icon={faCube}
													id="icon"
												/>
											)}
											{item().type === "Design" && (
												<FontAwesomeIcon
													icon={faPenRuler}
												/>
											)}
											{item().type === "Web" && (
												<FontAwesomeIcon
													icon={faGlobe}
												/>
											)}
											&nbsp;
											{item().title}
										</div>
										<div className="portfolio-item-subtitle">
											{item().subtitle}
										</div>
									</div>
								</Link>
							))}
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

export default Portfolio;
