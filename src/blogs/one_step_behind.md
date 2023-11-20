---
title: 'Always one step behind'
thumbnail: 'ex.png'
date: '2023-11-20'
description: 'My personal experience with finding out you were too late at capitalizing a trend.'
publisher: 'ubre'
published: true
---

Have you ever scrolled past a game or a meme that reminded you of something you were working on in the past but gave up?

Finding out that the one idea you had would've made you a millionaire, if only you kept working on it, finished it sooner, or advertised it better.

Working on S&box right now forces you to focus on multiple smaller projects, meaning that if we really wanted we could pump out a game every month, or even more.
In the past 2 years of doing so I found out that perhaps I'm not as original as I thought, or maybe we know what the people want.


<Heading title="Cat Harvest" />

In late 2021, me and Grodbert found a meme about a kitty being held with just one hand, with the "Harvest" prompt from Bioshock edited on top.

[SHOW IMAGE OF ORIGINAL MEME]

We were looking for a quick project to work on in S&box and we thought it would funny to try and turn the image into a game, so with the weekend coming up we challenged ourselves to have something playable by the end of it. We didn't make it in time, it took us 4 days to finish the game with me doing the code and Grodbert doing the art.

I'll be the first to admit that it's not a good game, if you wanted to get all the endings you'd be playing for an hour with most of the gameplay consisting of pressing W and picking up kittens.

It was a good experience, I learned how to compromise when limited on time which was an important skill for future game jams. Other than that, we mostly forgot about the game.

A few weeks go by and we receive a notification on our [Twitter Account](https://twitter.com/SmallFishDev), it was a mention on a huge gimmick account that tweeted the thumbnail of Cat Harvest and it was gathering a lot of attention. In the following days it would spread more, but this is a story for another blog though, which I'll link here when I'm done writing.

[CAROUSEL OF ALL POSTS]

Scrolling through all the comments we could find, a lot of people were interested in playing the actual game. It kinda bummed us out that all we could do is tell people the game wasn't available for the public, and knowing that S&box wouldn't release in the near future we couldn't do anything to capitalize on the minor success.

Could we have made millions from a silly game? Not really, but maybe a few YouTubers would've played it, and if we actually had something to sell it could've been a good payout for a 4 day project.

<Heading title="SealRP" caption="Also known as Seal Rehabilitation Project"  />

Would you look at that, another meme that we wanted to turn into a game, what a surprise.

Seal Rehabilitation Project was a small game with big things planned, I'm not going to disclose what they were because we might still go through with them, but right now it's permanently on hold.

Working on SealRP we learned that you can't just make all the assets for a game and come up with the actual game later. We probably had 5 different ideas on what the game could be, the scope went from being a wallpaper simulator to a FNAF clone with a quest system.

In the end we stopped working on it because cloth physics weren't working, and they were the most important part of the entire game because the seal model Grodbert made was universally liked by everyone that saw it.

[GIF OF THE SEAL]






<Heading title="What's stopping us?" />

Most of the times




This blog post serves as an example of how to create a blog post for this website.

1. Create a new `.md` file inside of this directory `src/blogs/`
   - The name of this file will be the route the website generates, so make sure it doesn't include spaces. For example... `example.md` will be `https://smallfi.sh/blog/example`.
   - If you want to include locally hosted media such as images or videos create a folder with the same name as the `.md` inside of `static/blogs/<blog_md_name>`.
2. Make sure at the top of your new `.md` file you have included a title, date, and enabled published similar to lines 1-5 of this post.
3. From there you can simply write normal [markdown](https://www.markdownguide.org/cheat-sheet/).

<Heading title="Code" />

You just use the [markdown feature](https://www.markdownguide.org/extended-syntax/#syntax-highlighting) for embedding code.

```csharp
public partial class Lord : BaseCharacter
{
    // Look at this amazing code.
}
```

<Heading title="Headings" caption="by matek" />

There is a custom header element you should be using instead of `## My Header`. Here are a few examples of usage...

- `<Heading title="Media" />`
- `<Heading title="Media" caption="by Luke" />`
- `<Heading h="h3" title="Media" caption="I am a smaller heading" />`

You can add a caption to a heading by simply following the example above.

The `h="h3"` parameter allows you to change the size of the heading. by default it will use `h="h2"` because the main title of the blog uses `h="h1"`. h1 -> h4 in terms of text size.

<Heading title="Media" />

I've written up a few components that allow you to embed media into your blog post. If you want to embed any local media please make sure you create a folder with the same name as your `.md` file inside of `static/blogs/<blog_md_name>`. For example... if your blog name was `example.md` then you would store all local media inside of `static/blogs/example/`.

<Heading h="h3" title="Images" />

You can use `<Img src=""ex.png"" />` to embed locally stored images.
<Img src="ex.png" />

You can also use the same component to embed images from the web.
<Img src="https://upload.wikimedia.org/wikipedia/en/3/31/Dota_2_Steam_artwork.jpg" />

<Heading h="h3" title="Video" />

<Heading h="h4" title="Local" />

You can use `<Video src="ex.mp4" />` to embed locally stored videos.

<Video src="ex.mp4" />

<Heading h="h4" title="YouTube" />

You can use `<Youtube id="3-TrbOxmK08" />` to embed YouTube videos.
<Youtube id="3-TrbOxmK08" />

<Heading title="Image Collage" caption="by ceitine" />

You can create a image carousel with the following:

`<ImageCollage images={["ex.png", "ex.png"]} />`.
<ImageCollage images={["ex.png", "ex.png"]} />

<Heading title="Twitter" />

You can use `<Twitter id="naven0m/status/1705531799277801668" />` to embed Tweets.
<Twitter id="naven0m/status/1705531799277801668" />

<Heading title="Spotify" />

You can use `<Spotify src="track/4F4TGsDYacEbw4PLAIyJ2e?si=ce064389dbbd4fb7" />` to embed songs.
<Spotify src="track/4F4TGsDYacEbw4PLAIyJ2e?si=ce064389dbbd4fb7"/>
