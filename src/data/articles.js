import React from "react";

function article_1() {
	return {
		date: "2 April 2019",
		title: " The Changing Dynamics Of Coffeehouse Culture",
		description:
			"Third places & social dynamics.",
		keywords: [
			"The Benefits of Cloud Computing",
			"Tharindu",
			"Tharindu N",	
			"Tharindu Nayanajith",
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.randImage {
					align-self: center;
					outline: 2px solid red;
				}
				`,
		body: (
			<React.Fragment>
				<div className="article-content">
						<p>The other night, I was at a local coffee shop searching for a new environment in hopes of replenishing my focus and work ethic (Grand aspirations, huh?). Sitting in the shop, with my laptop out and a cup of coffee not far from my hand, I mused on the interactions that coffee shops facilitate. Why has such a simple thing, a shop where you can buy coffee, become an international symbol of productivity? Coffeehouses have historical roots as social gathering points, not too dissimilar to that of bars or taverns, yet now we associate that atmosphere of coffee shops with MacBooks and earbuds, rather than just places to gather with friends. What’s caused this change in dynamics and are there any remnants of the social gathering places that these shops once were?</p>
						<br/>
						<p>Coffee shops, traditionally, are identified as third places in the field of Sociology. The concept of third places was coined by sociologist Ray Oldenburg to identify areas that don’t fall under the two major social environments that people encounter most often: home and work. This third type of social space is characterized as being socially neutral, and highly accessible, allowing for more diverse social interaction at different socioeconomic levels and through various means. Examples of these places might be, apart from a coffee shop, a store, a community center, library, or even a street or sidewalk. The essential aspect is the diversity of interaction they enable because of their neutrally and accessibility by all social classes and groups.</p>
						<br/>
						<p>A 2013 research study by Woldoff Lozzi and Dilks yielded that the portrayal of coffee shops as third places is still valid, but that new elements have initiated a slow change in the social dynamics of these places. Coffeehouses are beginning to become private zones to work instead of purely neutral spaces for socialization (referring to socialization on a macro scale, not merely the intentional socialization sometimes denoted by this term). This new aspect is undeniably apparent when contrasted with other types of third places such as churches, clubs, and parks. However, the question that follows is what caused this transition? The most obvious answer would be that a new social group (such as those who merely want low rent pseudo-offices to work in) has overtaken the previously unfocused group that third places are characteristic of; however, I would suggest that instead, this new social group emerged from the previous. The norms of the former group are still assumed and add to the usefulness of coffee shops as work spaces. The achieved effect is an environment that can be perceived as being socially responsive, despite the clear social isolation of the persons in the environment. Lozzi and Dilks evidently classify these new areas as Multifunctional Spaces.</p>
						<br/>
						<p>Coffeehouses clearly maintain duality in social nature, the question is, will the social responsiveness of these environments disappear? Or remain, despite the social isolation that members increasingly participate in as coffee shops become less recreational and more work-centric?</p>
				</div>
			</React.Fragment>
		),
	};
}

function article_3() {
	return {
		date: "1 June 2023",
		title: "Welcome!",
		description:
			"I updated my website! (again)",
		style: ``,
		keywords: [],
		body: (
			<React.Fragment>
				<h1>Welcome to my new website.</h1>
			</React.Fragment>
		),
	};
}


function article_2() {
	return {
		date: "14 April 2020",
		title: "Socialization Processes And Normative Contexts On University Campuses",
		description:
			"Weidman and university structures.",
		style: ``,
		keywords: [],
		body: (
			<React.Fragment>
				<p>Sitting in a university assembly on a Monday morning, feeling the creaking tension of the auditorium chairs, I was taken aback from my musing by one of the speaker’s many tangents. The tangent was about the difficulty the administration had in understanding why the student body deviates from the averages on many important social issues. The speaker noted that they and their colleagues didn’t know why the deviations were occurring or what motivators contributed to the differences in the student body in comparison to other major universities. This comment brought me to question, what role do undergraduate programs play in the socialization of students and why are the results of this socialization so varied across different campuses across the United States, even among standardized public universities?</p>
				<br/>
				<p>According to Weidman, the socialization of students is only partially shaped by the college experience with parental socialization, outside social groups, and student background playing a significant role in the development of students’ identities. This may begin to explain the differences in the social structures of universities. However, especially among public universities, it would be expected that the resulting diversity on campuses because of these outside factors would lead to some kind of normative social structure across universities, but instead, schools still have vastly different comparative social identities. The full answer must be found instead in the social structures of each specific university.</p>
				<br/>
				<p>Weidman categorizes the effects of the college experience into two categories: Normative contexts, the formal academic and social structures organized by the institution; and Socialization Processes, the un-institutionalized interaction of students. It’s the normative processes that are likely to have the most dichotomous effects across different campuses due to the institutionalization of the socialization where administrators have control over how student bodies interact. These factors may include admissions processes (e.g., affirmative action), sponsored campus event choices, campus policies, and the encouragement of certain behaviors or cultural norms by the administration. While eventually Socialization Processes are destined to have more control over a student’s socialization over four or more years, the Normative Contexts are likely where these Socialization Processes are based. Despite the resistance of most students to organized social contexts (Normative contexts), the college experience itself is precisely engineered to function as a social space. Thus, even the so-called un-institutionalized processes are destined to be influenced by normative contexts. Clearly, the polices of our universities and the way they structure their social environments has long lasting effects on students, even past their undergraduate years.</p>
			</React.Fragment>
		),
	};
}

const myArticles = [article_1, article_2, article_3].reverse();

export default myArticles;
