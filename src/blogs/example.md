---
title: 'Example Blog'
date: '2021-11-10'
published: true
---

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

<Heading title="Headings" caption="By matek" />

THere is a custom header element you should be using instead of `## My Header`. Here are a few examples of usage...

- `<Heading title="Media" />`
- `<Heading title="Media" caption="By Luke" />`
- `<Heading h="h3" title="Media" caption="I am a smaller heading" />`

You can add a caption to a heading by simply following the example above.

The `h="h3"` parameter allows you to change the size of the heading. By default it will use `h="h2"` because the main title of the blog uses `h="h1"`.

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

<Heading title="Twitter" />

You can use `<Twitter id="naven0m/status/1705531799277801668" />` to embed Tweets.
<Twitter id="naven0m/status/1705531799277801668" />

<Heading title="Spotify" />

You can use `<Spotify src="track/4F4TGsDYacEbw4PLAIyJ2e?si=ce064389dbbd4fb7" />` to embed songs.
<Spotify src="track/4F4TGsDYacEbw4PLAIyJ2e?si=ce064389dbbd4fb7"/>
