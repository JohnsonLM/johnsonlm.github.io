export type PageMeta = {
	title: string;
	description: string;
	keywords: string[];
	path: string;
	noindex?: boolean;
};

const defaultKeywords = [
	"Johnson Martin",
	"3D artist",
	"developer",
	"computer graphics",
	"topology",
	"scientific visualization",
];

const pages = {
	home: {
		title: "Johnson Martin",
		description:
			"Johnson Martin is a 3D artist, developer, and creative working across computer graphics, scientific visualization, and web technology.",
		keywords: defaultKeywords,
		path: "/",
	},
	about: {
		title: "About",
		description:
			"Learn about Johnson Martin's work in 3D art, technology, scientific visualization, and software development.",
		keywords: defaultKeywords,
		path: "/about",
	},
	portfolio: {
		title: "Portfolio",
		description: "Selected 3D, design, and web portfolio work by Johnson Martin.",
		keywords: defaultKeywords,
		path: "/portfolio",
	},
	articles: {
		title: "Articles",
		description:
			"Articles and notes from Johnson Martin on computer graphics, software development, culture, and related ideas.",
		keywords: defaultKeywords,
		path: "/articles",
	},
	notFound: {
		title: "404",
		description: "The requested page could not be found.",
		keywords: [],
		path: "/404",
		noindex: true,
	},
} satisfies Record<string, PageMeta>;

export default pages;
