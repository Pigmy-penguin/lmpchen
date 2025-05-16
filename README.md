# Lämpchen

A personal blog built with Astro for publishing articles, translations, and reading notes primarily focused on Marxism, political economy critique, and epistemology.

## Features

- Articles, translations, and reading notes collections
- RSS feeds for all content types
- Tags system
- Light/dark theme
- Open Graph image generation
- Random color generation
- Responsive design
- Markdown content with full support for footnotes and external links
- Dynamic tables of contents

## Project Structure

```
├── public/                   # Static assets
├── src/
│   ├── components/           # Astro components
│   ├── content/              # Content collections
│   │   ├── articles/         # Articles
│   │   ├── assets/           # Content images
│   │   ├── notes/            # Reading notes
│   │   ├── thumbnails/       # Thumbnails
│   │   └── translations/     # Translations
│   │ 
│   ├── layouts/              # Page layouts
│   ├── og/                   # Open Graph image generation
│   ├── pages/                # Page routes
│   ├── styles/               # Global styles
│   ├── utils/                # Utility functions
│   │ 
│   └── content.config.ts     # Content collections configuration
├── astro.config.ts           # Astro configuration
└── site.config.ts            # Site configuration
```

## Getting Started

### Prerequisites

- Node.js (use version specified in `.nvmrc`)
- pnpm (recommended package manager)

### Installation

1. Clone this repository
2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser at http://localhost:4321

## Configuration

### Site Settings

Edit site.config.ts to change site-wide settings:

```typescript
export const siteConfig = {
  url: "https://your-site-url.com", // Production URL
  title: "Your Site Title",
  description: "Your site description",
  author: "Your Name",
  twitterHandle: "yourhandle" // Without @
};
```

### Styling

The site uses Tailwind CSS with custom configuration. Main styling options can be modified in `src/styles/global.css`.

```css
@theme {
  --font-serif: "spectral", serif;
  --font-display: "Freckle Face";
  --font-sc: "Spectral SC", serif;

  --color-primary: #191616;
  --color-secondary: #eaeae7;
  --color-accent: var(--color-emerald-600);
}
```

#### Colors

- **--color-primary** is the dark color, used for texts on light mode and backgrounds on dark mode.
- **--color-secondary** is the opposite.
- **--color-accent** is the color used on links.

### Content Creation

Create content in Markdown format in the following directories:

- Articles: `src/content/articles/`
- Translations: `src/content/translations/`
- Notes: `src/content/notes/`

Each Markdown file requires frontmatter with at least:

```yaml
---
title: "Your Content Title"
description: "A brief description of your content" # Optional
published: "YYYY-MM-DD"
color: "#HEXCOLOR"  # Optional: Custom thumbnail color
tags:               # Optional: Tags for categorization
  - tag1
  - tag2
updated: "YYYY-MM-DD" # Optional. No frontend integration currently
---
```

#### Color generation

If no `color` registered, a random color will be generated for the content with `src/utils/getRandomColor.ts`.
Those will be regenerated at each build time.

You can edit the color to be the way you want by changing values in *lightness*, *chroma* and *hue*.

#### Adding Images

Store content images in `src/content/assets/` and reference them in your Markdown files like this:

```markdown
![alt text](../assets/filename.png)
```

## Deployment

The site is configured to deploy easily to Vercel, but can be deployed to any static site host that supports Astro.

1. Set up your repository on your hosting provider
2. Configure the build command: `pnpm build`
3. Set the output directory: dist

## License

This project is licensed under the MIT License.

## Credits

- Site design and implementation by [oomf](https://josephclenet.fr/)
- Built with [Astro](https://astro.build/)
- Fonts: Spectral, Freckle Face
