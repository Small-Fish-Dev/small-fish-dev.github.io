---
title: 'My Summer Cottage Devblog - Environment Art'
thumbnail: 'ex.png'
date: '2023-3-20'
description: 'wheatleys bit of game development'
publisher: 'ASS'
published: false
---

<Heading title="Environment Art" caption="by wheatleymf" />
I've ended up making making whole environment art for this game and UI design. That includes bunch of materials, some hard surface props, some nature props like rocks, cliffs and trees, whole UI, and some shader work like terrain & cliff shader. 

<Heading h="h3" title="Terrain" />
Terrain used in My Summer Cottage is a custom implementation that is done mostly in Hammer. When we've started working on this game, Matt's terrain system wasn't released yet so it made sense to rely on ourselves. There were many experiments with it -- chunking, procedural grass with distance & frustum culling, some other fancy things, but after all final terrain is just one big mesh. It's lazy, it's stupid, but it was a thing that worked best and didn't require too much time to implement into the game.

<Img src="whmf/terrain.png" />

Terrain is done in **World Creator 2**. Once it's done, I'd just export the .obj file and splat map image, then finalize it in Blender. Resolution of this mesh was low enough to effortlessly add it into Hammer, and when I needed to adjust the terrain for buildings and cliffs, I could easily convert the model into editable Hammer mesh with no issues. I really, really like this feature. 

As for textures and other stuff, it was done with a quickly crafted shader. Nothing fancy about it -- you just import splat data in RGBA format and then set up each splat color, normal & roughness maps. To avoid stretching on slopes, terrain uses triplanar mapping. For slightly better shading and details, I've added a pre-baked normal and AO maps from a higher resolution version of this terrain mesh. 

<Heading h="h3" title="Town" />
--town image--

Town was done in a super short amount of time so forgive me for making it look pretty bland and empty. I've started with adding buildings that are important for the gameplay -- gas station, shop, bar, and fishing shop. Once shape was complete, I have finished texturing on the next day and then moved onto filling the entire town with decorative buildings and apartments.

--wip screenshots from smallfish discord--

Nearly everything is filled with props made by Luke, he really saved my ass here and helped to make town feel more like a... town. Some stuff like trash bags, road signs and mail boxes are made by Cyber. Working with such limited timeframes takes many hours and it can feel pressuring, so I couldn't resist adding some dumb easter eggs.

--collage of gas station toilet with legs and bottle, competitive shitting in bar, "get well soon" elk--

I don't think anybody asked me to make the town as large as I did, because initially the plan was just a market, gas station and few points of interest, not an actual town. But I believed that we can do better stuff than just few shitshacks. I had like 4-5 hours of sleep last week and it did fuck up my health a little though. I'm getting old...

<Heading h="h3" title="Police Station" />
This game technically begins with police discovering you butt naked in forest, with no documents with you. That's the entire reason why you have to give your character a name, appearance and choose some starter clothes. Let me show you something that wasn't used in final game though — a corridor. You'd start in one of these cells and then follow the police officer. 

--police station corridor pic here--

This was the first map thing I've made for the game, and it was quite helpful to decide which materials I need to add into the game. This is where Luke and I made first batch of props that I'd later use everywhere on the map.

--police station character creation scene--

<Heading h="h3" title="Materials" />
All materials are done in Substance Designer, and as some of you might know already, all of them were initially made in 2K resolution. Why? Well, it's just easier to add details and generate more accurate AO maps when your heightmap is in high resolution. 

-- assets --

Once new material is complete, I'd go to Photoshop and process each texture. Combine albedo and AO maps, downscale to 256x256, then apply indexed colors. Sometimes I did that with normal and roughness maps too. To reduce inacurrate and "blurry" normals, I often had to disable normal map compression in material settings. That's probably not a good idea, but I hope it wasn't too bad consdering that total My Summer Cottage's size is ~300MB.

Most materials (in their original resolution) will be later uploaded to sbox.game, I can't promise an exact date though. As soon as I stop having fever dreams about Hammer and trying to solve issues I've encountered this month.

<Heading h="h3" title="Nature — Foliage" />
--render of oak trees--
Hunting is an important part of the game, so forest had to look at least somewhat acceptable. So I've made 7 tree variants, three types of oak tree and four spruce trees. Oak tree was mainly used in areas like town and cottages, while spruce trees were in the "wild" area. 

--render of spruce trees--

I also wanted to do grass but unfortunately I couldn't come up a nice solution for it before we ran out of time. I'll try figuring this out later. 

<Heading h="h3" title="Nature — Cliffs and Rocks" />
--screenshot from twitter--
Something I knew should be added are cliffs and rocks. Rocks are made with Blender and stack of Displace modifiers with voronoi & other noise generators. But there's also a cliff shader and it's a little bit more complex.

--cliff showcase video--

I wrote a cliff shader that would improve control over their visuals. Basically, first I do a high-poly cliff mesh in blender, bake it into game-ready lowpoly variant, make LODs. Then, since I do everything in Marmoset Toolbag, I'm also creating there 3 mesh data maps - peaks (curvature), cavity map and direction map. That's it, nothing else for this cliff required! Actual textures and other stuff on this mesh are applied with a shader. This is how material editor looks like.

--graph showing required assets for the cliff material--

Cliff shader will be uploaded to sbox.game later, too. There are a few things I'd like to improve before that, and provide better documentation how to use it and how can you generate mesh data maps. 
