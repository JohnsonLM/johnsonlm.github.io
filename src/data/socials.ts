export type SocialLink = {
	icon: string;
	compactIcon?: string;
	href: string;
	label: string;
	compactLabel?: string;
};

const socials = [
	{ icon: "simple-icons:x", compactIcon: "simple-icons:twitter", href: "https://twitter.com/johnsonlmCG", label: "Follow on Twitter", compactLabel: "Twitter" },
	{ icon: "simple-icons:github", href: "https://github.com/JohnsonLM", label: "Follow on GitHub", compactLabel: "GitHub" },
	{ icon: "simple-icons:linkedin", href: "https://www.linkedin.com/in/johnsonlm/", label: "Follow on LinkedIn" },
	{ icon: "simple-icons:instagram", href: "https://www.instagram.com/johnsonlmartin/", label: "Follow on Instagram", compactLabel: "Instagram" },
	{ icon: "simple-icons:mastodon", href: "https://mastodon.social/@johnsonlm", label: "Follow on Mastodon", compactLabel: "Mastodon" },
] satisfies SocialLink[];

export default socials;
