---
title: 'Example Blog'
date: '2021-11-10'
published: false
---

This blog post serves as an example of how to create a blog post for this website.

1. Create a new `.md` file inside of this directory `src/blogs/`
2. Make sure at the top of your new `.md` file you have included a title, date, and enabled published similar to lines 1-5 of this post
3. From there you can simply write normal [markdown](https://www.markdownguide.org/cheat-sheet/)

## Code

You just use the [markdown feature](https://www.markdownguide.org/extended-syntax/#syntax-highlighting) for embedding code.

```csharp
public partial class Lord : BaseCharacter
{
}
```

## Media

I've written up a few components that allow you to embed media into your blog post. If you want to embed any local media please put it inside the file path `static/blogs/<blog_name>`.

### Images

You can use `<Image src="<path>" />` to embed locally stored images or images from the web.
<Image src="/blogs/blog-example/example1.png" />

### Video

#### Local

You can use `<Video src="path" />` to embed locally stored videos.
<Video src="/blogs/blog-example/example.mp4" />

#### YouTube

You can use `<Youtube id="<video_id>" />` to embed YouTube videos.
<Youtube id="3-TrbOxmK08" />

## Twitter

You can `<Twitter id="<name/status/id>" />` to embed Tweets.
<Twitter id="naven0m/status/1705531799277801668" />

## Spotify

You can `<Spotify src="<track_link>" />` to embed songs.
<Spotify src="track/4F4TGsDYacEbw4PLAIyJ2e?si=ce064389dbbd4fb7"/>
