type Project = {
	title: string;
	date: string;
	description: string;
	logo: string;
	linkText: string;
	link: string;
};

type SiteInfo = {
	main: {
		title: string;
		name: string;
		email: string;
		logo: string;
	};
	socials: {
		twitter: string;
		github: string;
		linkedin: string;
		instagram: string;
		mastodon: string;
	};
	homepage: {
		title: string;
		description: string;
	};
	about: {
		title: string;
		description: string;
	};
	articles: {
		title: string;
		description: string;
	};
	projects: Project[];
};

const INFO = {
	main: {
		title: "Johnson Martin",
		name: "Johnson Martin",
		email: "contact@johnsonlm.com",
		logo: "/avatar.jpeg",
	},

	socials: {
		twitter: "https://twitter.com/johnsonlmCG",
		github: "https://github.com/JohnsonLM",
		linkedin: "https://www.linkedin.com/in/johnsonlm/",
		instagram: "https://www.instagram.com/johnsonlmartin/",
		mastodon: "https://mastodon.social/@johnsonlm",
	},

	homepage: {
		title: "3D Artist, Developer, Creative",
		description:
			"I am a creative with a passion for technology, artistry and science. As a 3D artist, I've created hundreds of 3D projects being used all over the world. As a developer, I've worked on a variety of projects, from full-stack web applications to Blender add-ons.",
	},

	about: {
		title: "Hey, I'm Johnson.",
		description:
			"I am a creative with a passion for new technologies. As a 3D artist, I've created hundreds of 3D projects being used all over the world. As a developer, I've worked on a variety of projects, from full-stack web applications to Blender add-ons and DevOps projects.",
	},

	articles: {
		title: "Here's what's been on my mind, from technical notes, to philosophical rabbit trails.",
		description:
			"I regularly write on topics in computer graphics, software development, and other genres here and across the web.",
	},

	projects: [
		{
			title: "Living Library 3D",
			date: "7 May 2023",
			description:
				"The Living Library is focused on creating accurate and beautiful 3D models of animals.",
			logo: "/livinglibrary-logo.webp",
			linkText: "Coming Soon",
			link: "https://LivingLibrary3D.org",
		},
		{
			title: "Topology Guides",
			date: "7 May 2023",
			description:
				"Topology Guides is a website built for teaching better 3D modeling.",
			logo: "/tg-logo.webp",
			linkText: "View Project",
			link: "https://topologyguides.com",
		},
		{
			title: "Research",
			date: "7 May 2023",
			description:
				"Take a look at the research I've been working on in 3D data reconstruction and scientific communication.",
			logo: "/Google_Scholar_logo.png",
			linkText: "View Project",
			link: "https://scholar.google.com/citations?user=tk3o41IAAAAJ",
		},
		{
			title: "ParkYard",
			date: "7 May 2023",
			description:
				"ParkYard is a powerful, modern, and open-source platform built for users and managers alike.",
			logo: "/parkyard.png",
			linkText: "View Project",
			link: "https://parkyard.app/",
		},
		{
			title: "Digital Life 3D",
			date: "7 May 2023",
			description: "The Digital Life project at UMass Amherst.",
			logo: "/dl_logo.webp",
			linkText: "View Project",
			link: "https://digitallife3d.org",
		},
		{
			title: "Photography",
			date: "7 May 2023",
			description:
				"Photography is one of my favorite hobbies. I release all of my photos for free on Unsplash.",
			logo: "/camera-solid.svg",
			linkText: "View Photos",
			link: "https://unsplash.com/@johnsonm",
		},
	],
} satisfies SiteInfo;

export default INFO;
