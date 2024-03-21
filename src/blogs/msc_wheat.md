---
title: 'My Summer Cottage Devblog - Environment Art'
thumbnail: 'ex.png'
date: '2023-3-20'
description: 'wheatleys bit of game development'
publisher: 'ASS'
published: false
---

<Heading title="Environment Art" caption="by wheatleymf" />
My contribution was creation of the environment art & UI design. This includes materials, some prop models, terrain and it's shader, cliffs (and it's shader too), nature assets like rocks and trees, character creation scene and other things. I suppose that someone above already showed off original UI concepts, so I'll just go over what I did for the in-game art. This turned out to be an extremely long wall of text, so I don't mind if you skip it all over, I just wanted to share my one-month-long journey.  

<Heading h="h3" title="Terrain" />
Oh boy, massive yapping ahead. By the time I have started working on My Summer Cottage, we still haven't agreed on many fundamental gameplay features but it was apparent that we'll need a better map with proper terrain. During that time Matt from Facepunch mentioned a few times that new Terrain System version is nearly done, but I've decided to look into implementing our own solution anyway — I knew that such new big features take time and it wouldn't hurt to have plan B.

I've started with creating a test terrain in **World Creator** and then writing a custom terrain shader. I knew that one month is good enough to make a solid game, but not enough to afford experimenting with everything you want, so there is nothing fancy about this implementation: it supports only four splat maps, all data is baked and you're expected to import a complete terrain mesh. 

--image goes here--

Textures are applied with triplanar mapping. Splat blending is done in a very lazy way and I should've done it better, unfortunately splats still don't use normal maps. Since you import a complete mesh, you can't easily edit it. There are two benefits though, I could easily pass pre-baked normal and AO maps so terrain has better shading even when you lower the mesh resolution. 

There was another problem! Terrain was imported right into Hammer. It is using the entire supported area so I couldn't nicely hide the edges of this terrain. Also, ubre couldn't get s&box to generate the navmesh properly, so I had to significantly lower the terrain resolution to something horribly low, but it didn't hurt the map much luckily.

--terrain material view image here--

Terrain was meant to look much nicer initially. Along with custom terrain shader, I was also working on implementing grass so it would look alright in-game. I was hoping that I'd get it working through tessellation and geometry shader. I've got geometry shader working nicely -- grass size/color variation, frustum culling, and it all looked nice. But you have to tessellate your mesh to achieve acceptable grass density, and unfortunately I couldn't figure it out. Maybe it's just me, or there's something on s&box's end, but I was running out of time so I had to scrap it all.

--terrain before grass has been removed--

In future updates for My Summer Cottage, I hope I will be able to figure out most issues and try use Matt's terrain system, even though this might require reworking a huge portion of the map. There's a huge room for terrain to improve.

<Heading h="h3" title="Town" />
--town image--

Town was done in a super short amount of time so forgive me for making it look pretty bland and empty. I've started with adding buildings that are important for the gameplay -- gas station, shop, bar, and fishing shop. Once shape was complete, I have finished texturing on the next day and then moved onto filling the entire town with decorative buildings and apartments.

--wip screenshot from smallfish discord--

Nearly everything is filled with props made by Luke, he really saved my ass here and helped to make town feel more like a... town. Some stuff like trash bags, road signs and mail boxes are made by Cyber. Working with such limited timeframes takes many hours, so I couldn't resist adding some dumb easter eggs.

--collage of gas station toilet with legs and bottle, competitive shitting in bar, "get well soon" elk--

I had like 4-5 hours of sleep last week and it did fuck up my health a little. I'm getting old...

<Heading h="h3" title="Police Station" />
This game technically begins with police discovering you butt naked in forest, with no documents with you. That's the entire reason why you have to give your character a name, appearance and choose some starter clothes. Let me show you something that wasn't used in final game though — a corridor. You'd start in one of these cells and then follow the police officer. 

--police station corridor pic here--

This was the first map thing I've made for the game, and that's where I've made my first batch of materials. It was kind of helpful to decide which materials should be done, as well as figure out the best way to implement them and define for myself how do I imagine the final game.

--police station character creation scene--

<Heading h="h3" title="Materials" />
Speaking of materials, I don't have much to tell here but have some stuff to show off. If you haven't seen my WAYWO post in s&box discord, then you can look at my stuff here. I've made all materials for the map and police station, more than 40 of them! Originally, all materials are made in 2k resolution since it makes easier to generate AO map for them and include little details.

--bunch of mats here--

When it's complete, I'm downscaling the material to 256x256 resolution and apply indexed color mode in Photoshop, which creates limited palette and nice dithering pattern. To make it look better in-game, I usually also combine AO with albedo map before downscaling, it adds some depth to the material that can't be done via shading when texture is in such low resolution.

The only exception are terrain materials - rock, grass, forest and stones materials, they're in 512x512 resolution since that makes them look more seamless. 

<Heading h="h3" title="Nature — Trees" />
--render of oak trees--
Hunting is an important part of the game, so forest had to look at least somewhat acceptable. So I've made 7 tree variants, three types of oak tree and four spruce trees. Oak tree was mainly used in areas like town and cottages, while spruce trees were in the "wild" area. 

--render of spruce trees--

<Heading h="h3" title="Nature — Cliffs and Rocks" />
--screenshot from twitter--
Something I knew should be added are cliffs and rocks. Cliffs added some difficulty in exploring the wild area, and rocks just made it look slightly more believable. While there's nothing to tell about rocks, (it's just bunch of rocks generated in Blender using Displace modifier and some noise textures) there's something I did for cliffs...

--cliff showcase video--

I wrote a cliff shader that would improve control over their visuals. Basically, first I do a high-poly cliff mesh in blender, bake it into game-ready lowpoly variant, make LODs. Then, since I do everything in Marmoset Toolbag, I'm also creating there 3 mesh data maps - peaks (curvature), cavity map and direction map. That's it, nothing else for this cliff required! Actual textures and other stuff on this mesh are applied with a shader. This is how material editor looks like.

--graph showing required assets for the cliff material--

I am really happy with this workflow. I think it's quite convenient. 