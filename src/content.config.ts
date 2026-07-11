import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const articles = defineCollection({
	loader: glob({ base: "./src/content/articles", pattern: "**/*.md" }),
	schema: z.object({
		order: z.number(),
		date: z.string(),
		title: z.string(),
		description: z.string(),
		keywords: z.array(z.string()).default([]),
	}),
});

const portfolio = defineCollection({
	loader: glob({ base: "./src/content/portfolio", pattern: "**/*.json" }),
	schema: z.object({
		order: z.number(),
		date: z.string(),
		title: z.string(),
		background: z.string(),
		link: z.string().default("#"),
		subtitle: z.string(),
		type: z.enum(["3D", "Design", "Web"]),
		description: z.string(),
		images: z.array(z.string()).default([]),
		videos: z.array(z.string()).default([]),
		keywords: z.array(z.string()).default([]),
	}),
});

export const collections = { articles, portfolio };
