# AGENTS.md - Johnson Martin Personal Website

## Project Overview

Personal portfolio website for Johnson Martin (3D artist, developer, creative). Migrated from Create React App to **Astro v7** with static site generation and GitHub Pages deployment.

**Live site**: https://johnsonlm.com  
**Repository**: johnsonlm.github.io

---

## Essential Commands

```bash
pnpm install          # Install dependencies (uses pnpm 11.3.0)
pnpm dev              # Start dev server with hot reload
pnpm build            # Build static site to dist/
pnpm check            # Type-check with TypeScript
pnpm preview          # Preview production build locally
```

**Package manager**: pnpm (required, not npm/yarn)  
**Node version**: 22 (see `.github/workflows/deploy.yml`)

---
### Directory Structure

```
src/
├── app.css                    # Global styles + Tailwind theme
├── styles/
│   └── homepage.css           # Complex homepage layouts (immersive hero, point cloud)
├── content.config.ts          # Content collection schemas (Zod)
├── layouts/
│   └── BaseLayout.astro       # Root layout with SEO meta tags, theme switching
├── pages/                     # Route-based pages
│   ├── index.astro            # Homepage
│   ├── about.astro
│   ├── projects.astro
│   ├── contact.astro
│   ├── homepage-mockups.astro # Alternative homepage design
│   ├── articles/              # Articles listing and detail pages
│   │   ├── index.astro        # Article listing
│   │   └── [slug].astro       # Dynamic article detail pages
│   └── portfolio/             # Portfolio listing and detail pages
│       ├── index.astro        # Portfolio listing
│       └── [slug].astro       # Dynamic portfolio detail pages
├── components/                # Reusable UI components
│   ├── common/                # NavBar, Footer, Logo
│   ├── homepage/              # HomeArticle, PointCloudBackground
│   ├── projects/              # AllProjects, Project
│   └── articles/              # ArticleListItem
├── content/                   # Markdown/JSON content collections
│   ├── articles/*.md          # Blog posts
│   └── portfolio/*.json       # Portfolio items
└── data/
    ├── user.ts                # Site metadata, social links, project info
    ├── pages.ts               # Page configuration
    └── tracking.ts            # Analytics config
```

### Key Architectural Patterns

1. **Content Collections**: Two typed collections using Zod schemas
   - `articles`: Markdown files with frontmatter (order, date, title, description, keywords)
   - `portfolio`: JSON files with structured data (images, videos, type enum: "3D" | "Design" | "Web")

2. **Static Generation**: All routes generated at build time via `getStaticPaths()` in dynamic routes (`[slug].astro`)

3. **Directory Structure**: Articles and portfolio use consistent structure:
   - `articles/index.astro` - listing page
   - `articles/[slug].astro` - detail pages (routes to `/articles/:slug`)
   - `portfolio/index.astro` - listing page  
   - `portfolio/[slug].astro` - detail pages (routes to `/portfolio/:slug`)

4. **Theme System**: Dual light/dark themes via CSS custom properties on `:root.light-theme` and `:root.dark-theme`. Theme preference persisted in localStorage.

5. **Component Styling**: All components and pages use Tailwind utility classes directly in templates. No custom CSS files remain.

6. **SEO**: BaseLayout handles all meta tags (Open Graph, Twitter Cards, JSON-LD structured data) via props

---

## Content Management

### Adding Articles
1. Create `.md` file in `src/content/articles/`
2. Include frontmatter: order, date, title, description, keywords
3. Article body as Markdown

### Adding Portfolio Items
1. Create `.json` file in `src/content/portfolio/`
2. Required fields: order, date, title, background (image path), subtitle, type, description
3. Optional: images array, videos array, link, keywords
4. Type must be one of: "3D", "Design", "Web"

### Updating Site Info
Edit `src/data/user.ts` for:
- Personal info (name, email, logo)
- Social media links
- Homepage/about text
- Featured projects list

---

## Important Gotchas
3. **Image Paths**: Static assets in `/public/` referenced with leading slash (e.g., `/avatar.jpeg`). Content images use relative paths from public root.

4. **Dynamic Routes**: `[slug].astro` files require `getStaticPaths()` export returning params and props.

5. **Client Scripts**: Scripts in `.astro` files run on client but are not ES modules by default. Use explicit `type="module"` if needed.

6. **Content Sorting**: Collections sorted by `order` field in content files, not filename or date.

7. **Build Output**: Static files generated to `dist/` directory, deployed to GitHub Pages.

8. **Icon Usage**: Import from `astro-icon/components`, use Iconify name format (e.g., `"lucide:mail"`, `"simple-icons:github"`).

---

## Deployment

- **Platform**: GitHub Pages
- **Trigger**: Push to `main` branch or manual workflow dispatch
- **Process**: CI builds with pnpm, uploads `dist/` as artifact, deploys via `actions/deploy-pages`
- **Domain**: Custom domain configured via `public/CNAME`

---

## Testing

No test framework currently configured. Manual testing via:
- `pnpm dev` for development
- `pnpm preview` for production preview
- `pnpm check` for TypeScript errors