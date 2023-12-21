---
title: 'New Website'
thumbnail: 'map.png'
date: '2023-11-20'
description: 'We wrote our own fucking website'
publisher: 'matek'
---

For the past few weeks, we have been hard at work developing our new website. Finally, we are ready to unveil it. This post will cover some of the implementation details and hurdles we faced during development. If you want to check out the source code, it's available [here](https://github.com/Small-Fish-Dev/small-fish-dev.github.io).

A big thanks to ceitine for assisting me with the development of the website, and to wheatleymf for designing the website itself.

<Heading title="Selecting a Framework" caption="by matek" />

The challenging aspect of web development is the abundance of frameworks available, but the fortunate side is having numerous options to choose from. The majority of popular web frameworks can achieve the same subset of tasks, making it primarily about selecting a framework that aligns with your comfort level. My prior experiences with [React](https://react.dev/) and [Angular](https://angular.io/) have been negative. React often feels overly complex for basic behavior, while Angular involves dealing with decorators and boilerplate, creating a somewhat cumbersome experience. I recently had the opportunity to write a website in [SvelteKit](https://kit.svelte.dev/) and I instantly fell in love. It's simple and just works.

Alongside this I also decided to use [Tailwind](https://tailwindcss.com/) as our CSS framework. It offers a plethora of useful CSS functionalities directly through classes.

<Heading title="Blogs" caption="by matek and ceitine" />

Our top priority was to ensure that it would be extremely easy for non-developer fish to write and submit blogs to the website. We found an incredible package called [MDsveX](https://github.com/pngwn/MDsveX) that converts markdown files to Svelte components. This means that all of our blogs could be written in markdown and instantly converted to a viewable webpage.

While markdown supports some embeds like links and images, what about more complicated components? The fantastic aspect of MDsveX is that you can embed Svelte components within markdown. This capability allows us to write whatever components we need for blogs. Here's an example of how MDsveX enables the importing and usage of Svelte components in markdown files.

```svelte
<script>
	import Video from './Video.svelte';
</script>

<Video src="ex.mp4" />
```

It seemed really annoying that you would have to manually import each component if you wanted to use it. The package [sveltekit-autoimport](https://github.com/yuanchuan/sveltekit-autoimport) alleviates that issue by automatically importing each component. So in order to use our custom `<Video />` component it simplifies to the following.

```svelte
<Video src="ex.mp4" />
```

We now have a way of providing custom components that even non-developers can quickly import and use. Want to embed a Spotify song? Just use the Spotify component.

```svelte
<Spotify src="track/5YdbRdc2AhwJXzz8eOfCP3?si=fc6b451c19474bec" />
```

<Spotify src="track/5YdbRdc2AhwJXzz8eOfCP3?si=fc6b451c19474bec" />

<Heading title="Map" caption="by matek, ceitine, and wheatleymf" />

Wheatleymf crafted a beautiful design for the map page—a 2D world map that users can pan around to explore the various locations where we all live (don't dox us).

The [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) was the obvious choice to implement this functionality. We simply create a full screen canvas. Draw a few images on the canvas and allow the mouse to translate, zoom, and pan those images around together. We used a heavily modified version of [svelte-pan-zoom](https://github.com/CaptainCodeman/svelte-pan-zoom#svelte-pan-zoom) to implement this functionality.

Ceitine had a brilliant idea of implementing hyperlinking for member names directly to the team page. Now, you can click on any of our names and be instantly taken to the respective pin on the world map to learn more about us.
<ImageCollage images={["map_ceitine.png", "map_matek.png", "map_wheatley.png"]} />

We store all member data in a `Member.ts` which allows for easy modification of any data on this page if necessary.

```ts
{
    name: 'wheatleymf',
    avatar: '/team/profiles/wheatleymf.jpg',
    description: 'I am doing lots of stuff at the cost of my sleep schedule.',
    point: { x: 365, y: 38 },
    country: Countries.Russia,
    socials: ['https://wheatleymf.net', 'https://twitter.com/wheatleymf']
},
```

<Heading title="Static Site" caption="by matek" />

This entire site can be considered static since we don't have any dynamic content that needs to be fetched or altered from some database. Which allows us to host the website for free using [GitHub Pages](https://pages.github.com/). Even better we make use of [GitHub Actions](https://github.com/Small-Fish-Dev/small-fish-dev.github.io/blob/main/.github/workflows/deploy.yml) and deploy the site automatically whenever any change is made to the website.

<Heading title="Conclusion" caption="by matek" />

Those were the most interesting challenges we encountered while developing our site, aside from debugging the spaghetti TypeScript code we wrote here and there.
