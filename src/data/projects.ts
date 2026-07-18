export type Project = {
	title: string;
	description: string;
	logo: string;
	linkText: string;
	link: string;
};

const projects: Project[] = [
	{
		title: "Living Library 3D",
		description: "The Living Library is focused on creating accurate and beautiful 3D models of animals.",
		logo: "/livinglibrary-logo.webp",
		linkText: "Coming Soon",
		link: "https://LivingLibrary3D.org",
	},
	{
		title: "Topology Guides",
		description: "Topology Guides is a website built for teaching better 3D modeling.",
		logo: "/tg-logo.webp",
		linkText: "View Project",
		link: "https://topologyguides.com",
	},
	{
		title: "Research",
		description: "Take a look at the research I've been working on in 3D data reconstruction and scientific communication.",
		logo: "/Google_Scholar_logo.png",
		linkText: "View Project",
		link: "https://scholar.google.com/citations?user=tk3o41IAAAAJ",
	},
	{
		title: "ParkYard",
		description: "ParkYard is a powerful, modern, and open-source platform built for users and managers alike.",
		logo: "/parkyard.png",
		linkText: "View Project",
		link: "https://parkyard.app/",
	},
	{
		title: "Digital Life 3D",
		description: "The Digital Life project at UMass Amherst.",
		logo: "/dl_logo.webp",
		linkText: "View Project",
		link: "https://digitallife3d.org",
	},
	{
		title: "Photography",
		description: "Photography is one of my favorite hobbies. I release all of my photos for free on Unsplash.",
		logo: "/camera-solid.svg",
		linkText: "View Photos",
		link: "https://unsplash.com/@johnsonm",
	},
];

export default projects;
