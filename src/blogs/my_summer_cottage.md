---
title: 'My Summer Cottage'
thumbnail: 'bg.jpg'
date: '2024-3-20'
description: 'Our submission for the first FacePunch hosted s&box game jam'
published: false
---

We ended up participating in the first FacePunch-hosted game jam and ended up [winning 1st place!](https://asset.party/c/gamejam1/results) If you're curious about any development details, we've compiled together some of the most interesting parts below.

Not everything each induvidual person did ended up in here, there was too many cases where X made all these, X also fixed that, X did this which didnt make it in in time, so keep in mind there was even more than you see here that went on.

<Heading title="Events" caption="by ubre" />
To correctly simulate the average finnish day we had to include events, ranging from mildly annoying to batshit insane. Of course it was mostly set up with ActionGraph, all it needed was a bunch of custom nodes and components.

<Img src="ubres/event_setup.jpg" caption="The Driver Jacket event - by Luke" />

Every event is already placed in the scene disabled, at the start of each day it's enabled. To make working in the scene less shit when there's a lot of events, every component and child in an event is disabled until you select it through the handler placed in the world.

If the start-state of the event is different from the end-state (For example something that moves or spawns npcs) then the initial state will be serialized, and when the event restarts it will be deserialized and reinstantiated after deleting the old one.

<Img src="ubres/event_aliens.jpg" caption="ActionGraph for the UFO event - by Ubre" />

<Heading title="Interaction System" caption="by matek and ceitine" />

The interaction system is what enables every single interaction between the player and some object in the world. Essentially, every single object should allow for multiple interactions. These interactions should call a piece of code that gives them access to the player interacting and the object being interacted with. The most important field in the Interaction object was an action graph definition. This would allow us to add interactions through the editor and define the behavior via action graph.

Here is an example of the beer bottle object. We define an interaction "Drink" which is triggered via "mouse1".

<Img src="beer_interaction.jpg" />

Then using the Action property, we can hook up some action graph code to trigger the functionality. In this case, the interactor (which is the player) receives 20 experience and the obj (the bottle) is destroyed.

<Img src="beer_actiongraph.jpg" />

There are a few cases where instead of using action graph you'd want to define these in code. One such instance is that every single item in the game should have a "Pickup" interaction by default. It'd be annoying to have to add this interaction to each object manually. During the OnStart() of our ItemComponent, we would do the following...

```csharp
// Pickup
var interactions = Components.GetOrCreate<Interactions>();
interactions.AddInteraction( new Interaction()
{
	Identifier = "item.pickup",
	Action = ( Player interactor, GameObject obj ) => interactor.Inventory.GiveItem( this ),
	Keybind = "use",
	Description = "Pickup",
	Disabled = () => !Player.Local.Inventory.HasSpaceInBackpack(),
	ShowWhenDisabled = () => true,
	Accessibility = AccessibleFrom.World,
	Sound = () => _pickupSound,
} );
```

This would ensure that every single item in our game by default can use the same pickup interaction.

<Heading title="Dialogue System" caption="by matek" />

We didn't have much time, and a dialogue system needed to be implemented. The only thing I knew is that I wanted to use the action graph to drive the dialogue tree behavior. With a perfectly good interaction system already built, I decided to build the dialogue system on top of the interaction system.

Here is an example of one of the dialogue interactions. You define a dialogue interaction very similarly to a regular interaction. It needs a keybind, description, and an action graph function to execute.

<Img src="dialogue_interaction.jpg" />

Then we just use the action graph function to execute any dialogue and move us to any other dialogue stage we need!

<Img src="dialogue_actiongraph.jpg" />

<Heading title="Tools & Gizmos" caption="by ceitine and ubre" />

Ubre and I spent some time adding cool gizmos and tools for our game just to make it faster to push out content. I think they're pretty important considering the fact that we want to keep working on this game in the future.

<ImageCollage images={["hold_tool.jpg", "icon_tool.jpg", "interaction.jpg", "signal_widget.jpg"]} />

These tools helped us during the jam and will continue to do so in the future. We even expanded our interaction system by setting up interaction bounds gizmos. This feature ended up being used only for the slot machine, but perhaps in the future, we'll want to utilize it for more functionality, such as radio buttons.

If you haven't realized already, the action graph played a major part in our ability to produce mass amounts of content for our game.

<Heading h="h4" title="Signal Widget" caption="by ubre" />

We needed a way to connect everything up: Tasks, Interactions, Events, Items, NPC. We experimented a bit, but in the end, the easiest method was the best: Something happens, send a unique signal (string) that identifies what happened to the master, the master checks through each manager to see if there's logic to be run, and let the manager do its thing.

As usual the artists hated this system. It was mostly guesswork, and to know specific signals you had to look through the code and piece things together to get the correct signal.

So I spent an entire day working on Signals, a class which just contains a string, but comes with its own editor widget and is implicitly casted and equal to a string.

Populating the menu was a huge pain, a lot of C# reflection and JSON deserialization was involved, so I had to learn how to do custom JSON Serializers and Deserializers for it.

<ImageCollage images={["ubres/signal_search.jpg", "ubres/signal_events.jpg", "ubres/signal_scene.jpg", "ubres/signal_task.jpg"]} />

<Heading title="UI" caption="by wheatleymf, gio, matek and ceitine" />

Wheatley did some amazing UI designs for everything and the rest of us tried our best to make it look as good as his original mock-ups.

<Heading h="h4" title="Character Creation" caption="by ceitine and wheatleymf" />

Initially, I wasn't sure if the designs were a bit too ambitious for what we could do in a month, but I ended up doing most of the character creation on the first weekend of the contest. I made adjustments and improvements to it throughout the entire contest, though.

Here are the initial mock-ups by Wheatley

<ImageCollage images={["passport_wheatley.jpg", "appearance_wheatley.jpg", "dressing_up_wheatley.jpg", "mugshot_wheatley.jpg"]} />

and the final results in game

<ImageCollage images={["passport.jpg", "appearance.jpg", "dressing_up.jpg", "mugshot.jpg"]} />

<Heading h="h4" title="Day Recap" caption="by ceitine and wheatleymf" />

I asked Wheatley for a day recap screen design, and he sent it over. I didn't question what the "sweet memories" part was supposed to be; I just went with my imagination, and it ended up aligning pretty well with Wheatley's vision.

<ImageCollage images={["day_recap_wheatley.jpg", "day_recap.jpg", "funny_picture_1.jpg", "funny_picture_2.jpg"]} />

I made the code for it really shrimple, so that you could easily capture moments from ActionGraph or code. Here's an example of how the big fish catches are captured.

```csharp
var range = definition.GetComponent<Fish>().Get<RangedFloat>( "WeightRange" );
if ( weight >= range.y * 0.3f ) // Has to be atleast 30% of max weight.
{
	var caption = Game.Random.FromArray( fishingCaptions )
		.Replace( "%w", (record.MaxWeight / 1000f).ToString() )
		.Replace( "%s", species );
	var delay = Game.Random.Int( 0, 400 );
	GameTask.RunInThreadAsync( async () =>
	{
		await GameTask.Delay( delay );
		CaptureMemory( caption, "big_catch" );
	} );
}
```

<Heading title="Player" caption="by Grodbert" />

Most of the player was actually done around the time "Sauna" was first conceived, since Ceitine needed a player for his project. Compared to my later animation work, the player's are noticeably wonky and snappy.

The model, walking, running, crouching, jumping, and the fatness morphs were already done. To finnish it, I added the rest of what a player model needs, stuff like holding, interacting, height, weapons, and even an unused feature to control penis length.

<Video src="grods/player.mp4" />

Since the camera was attached to the world model's head, I wasn't given much freedom with the movements in the animations, which resulted in some tame looking attacks, actions, and poses. Hopefully our next project will have a separate first/third person.

<Heading title="Props, items and props", caption="by Luke, wheatleymf & cyberagent" />

<Heading h="h4" title="Lukes" />

I just gathered a list of many props and made them. I also kept stealing props from Wheatley's list and making them to give him time on the map. Overall, if someone said "hey we need X model," I would just quickly bang it out in an hour or two, and that's how all these models came to be.

I did end up re-using 4-5 existing models, and ended up changing their gemootry and re-texturing on most of them. But everything else was made with these 2 hands of mine in that 4 week period.

<ImageCollage images={["lukes/props1.jpg", "lukes/props2.jpg", "lukes/props3.jpg", "lukes/props4.jpg", "lukes/props5.jpg", "lukes/items.jpg" ]} />
Reskins of posters and store signs were mostly all Wheatley's doing + 1 design by shlako.

<Heading h="h4" title="Wheatley's" />

I've made few props as well. I was much slower at doing them, but I've made stuff like electrical box with Ape Tavern reference, trash bin, character creation things like passport, tablet & mugshot, as well as these three things.

<Img src="whmf/props.png" />

<Heading h="h4" title="Cyber's" />

I am still relatively new too modelling, texturing is a big thing i needed to learn for this jam, so learning from the other artists, i looked at how they did it, and decided for now to just do it in photoshop.

<ImageCollage images={["cyberairhorn.png", "cyberammo.png", "cyberaxe.png", "cybercollage.png", "cybercrate.png", "cyberflash.png", "cybermeat.png" ]} />

In Photoshop i set the mode to indexed color. This would create a really good effect, as you can see on most of my models they came out to be very stylized as consistent to what we needed as we could.

In the future, I want to try what Wheatley does, by making high-quality models, then compressing them down. I think it gives it a really high-quality look even though it's PSX style. It's something new and fresh.

<Heading title="Clothing" caption="by Luke" />

I did all the clothing. In total, counting re-skins and colored variations, I did around 96 pieces of clothing.

<ImageCollage images={["clothing1.jpg", "clothing2.jpg", "clothing3.jpg", "clothing4.jpg", "clothing5.jpg",]} />

I did 1 massive shortcut that you may notice in the final models...
NO high poly, only base low poly, and then painting in height folds in substance painter, you may notice it, but the low-res crunch hides most of that ugliness of it not being right.
Made way more clothes with this method.
<Img src="lukes/clothing_folds.jpg" />

I also made massive use of a Blender plugin called ["Mesh Data Transfer"](https://mmemoli.gumroad.com/l/tOKEh). Since we have a fatness morph and needed clothing to also accommodate fatness, here is an example of it working. It worked perfectly almost every time!

<Img src="morph_transfer.gif" />

Then i finally would just set up clothing prefabs and icons so they can be used ingame.

<Heading title="Animals" caption="by Grodbert" />

The forest needed some life, and I needed some work, so Ceitine gave me a list of typical Finnish animals: Elk, Foxes, and Hares. Unfortunately, nobody told me that in Finland they call Moose "Elks." Luckily, my plan was to have a versatile base and retexture to add more variety: Reindeers, Moose, and actual Elks, even though they aren't found in Finland. But nobody will care!

Hares were useful "early game" animals that could be killed with the BB gun, and Foxes hunt hares and steal your fish. I'm happy I got to practice a lot with sculpting, rigging, and animating; I was really lacking in those departments.

<ImageCollage images={["grods/elkanims.gif", "grods/hareanims.gif", "grods/foxanims.gif"]} />

<Heading title="Environment Art" caption="by wheatleymf" />

I ended up making environment art for this game, as well as UI design. That includes a bunch of materials, some hard surface props, some nature props like rocks, cliffs, and trees, the whole UI, and some shader work like terrain and cliff shaders.

<Heading h="h3" title="Terrain" />

Terrain used in "My Summer Cottage" is a custom implementation that is done mostly in Hammer. When we started working on this game, Matt's terrain system wasn't released yet, so it made sense to rely on ourselves. There were many experiments with it -- chunking, procedural grass with distance and frustum culling, and some other fancy things, but after all, the final terrain is just one big mesh. It's lazy, it's stupid, but it was a thing that worked best and didn't require too much time to implement into the game.

<Img src="whmf/terrain.png" />

Terrain is done in **World Creator 2**. Once it's done, I'd just export the .obj file and splat map image, then finalize it in Blender. The resolution of this mesh was low enough to effortlessly add it into Hammer, and when I needed to adjust the terrain for buildings and cliffs, I could easily convert the model into editable Hammer mesh with no issues. I really, really like this feature.

I've added a few little details into the shader as well so it wouldn't look too bad, such as color variance and shoreline wetness so it'd look "wet" at the water level.

<Video src="whmf/sbox-dev_dXuyFSVnmc.mp4" />
<Video src="whmf/sbox-dev_eTEqv5U0nB.mp4" />

As for textures and other stuff, it was done with a quickly crafted shader. Nothing fancy about it -- you just import splat data in RGBA format and then set up each splat color, normal, and roughness maps. To avoid stretching on slopes, terrain uses triplanar mapping. For slightly better shading and details, I've added pre-baked normal and AO maps from a higher resolution version of this terrain mesh.

<Heading h="h3" title="Materials" />

All materials are done in Substance Designer, and as some of you might already know, all of them were initially made in 2K resolution. Why? Well, it's just easier to add details and generate more accurate AO maps when your heightmap is in high resolution. Let me show you some of my favorite ones.

<Img src="whmf/materials.jpg" />

Once a new material is complete, I'd go to Photoshop and process each texture. I'd combine albedo and AO maps, downscale to 256x256, then apply indexed colors. Sometimes I did that with normal and roughness maps too. To reduce inaccurate and "blurry" normals, I often had to disable normal map compression in material settings. That's probably not a good idea, but I hope it wasn't too bad considering that the total size of My Summer Cottage is ~300MB.

Most materials (in their original resolution) will be later uploaded to asset.party. I can't promise an exact date though, as I'm still dealing with fever dreams about Hammer and trying to solve issues I've encountered this month.

<Heading h="h3" title="Nature — Foliage" />
<ImageCollage images={["whmf/trees2.jpg", "whmf/trees1.jpg"]} />

Hunting is an important part of the game, so the forest had to look at least somewhat acceptable. So I made 7 tree variants: three types of oak trees and four spruce trees. Oak trees were mainly used in areas like the town and cottages, while spruce trees were in the "wild" area. I also wanted to do grass, but unfortunately, I couldn't come up with a nice solution for it before we ran out of time. I'll try figuring this out later.

<Heading h="h3" title="Nature — Cliffs and Rocks" />
<Img src="whmf/rocks.jpg" />

Something I knew should be added are cliffs and rocks. Rocks are made with Blender and stack of Displace modifiers with voronoi & other noise generators. But there's also a cliff shader and it's a little bit more conchplex.

<Video src="whmf/sbox-dev_fFTPvJPZNi.mp4" />

I wrote a cliff shader that would improve control over their visuals. Basically, first I do a high-poly cliff mesh in blender, bake it into game-ready lowpoly variant, make LODs. Then, since I do everything in Marmoset Toolbag, I'm also creating there 3 mesh data maps - peaks (curvature), cavity map and direction map. That's it, nothing else for this cliff required! Actual textures and other stuff on this mesh are applied with a shader. This is how material editor looks like.

<ImageCollage images={["whmf/cliffshader.png", "whmf/cliffshader2.png"]} />

Cliff shader will be uploaded to asset.party later, too. There are a few things I'd like to improve before that, and provide better documentation how to use it and how can you generate mesh data maps.

<Heading h="h3" title="Town" />
<Img src="whmf/town.png" />

Town was done in a super short amount of time so forgive me for making it look pretty bland and empty. I've started with adding buildings that are important for the gameplay -- gas station, shop, bar, and fishing shop. Once shape was complete, I have finnished texturing on the next day and then moved onto filling the entire town with decorative buildings and apartments.

<ImageCollage images={["whmf/town3.png", "whmf/town2.png", "whmf/town1.png"]} />

Nearly everything is filled with props made by Luke, he really saved my ass here and helped to make town feel more like a... town. Some stuff like trash bags, road signs and mail boxes are made by Cyber. Working with such limited timeframes takes many hours and it can feel pressuring, so I couldn't resist adding some dumb easter eggs.

<Img src="whmf/things.png" />

I don't think anybody asked me to make the town as large as I did, because initially the plan was just a market, gas station and few points of interest, not an actual town. But I believed that we can do better stuff than just few shitshacks. I had like 4-5 hours of sleep last week and it did fuck up my health a little though. I'm getting old...

<Heading h="h3" title="Police Station" />
This game technically begins with police discovering you butt naked in forest, with no documents with you. That's the entire reason why you have to give your character a name, appearance and choose some starter clothes. Let me show you something that wasn't used in final game though — a corridor. You'd start in one of these cells and then follow the police officer.

<ImageCollage images={["whmf/police1.png", "whmf/police2.png"]} />

This was the first map thing I've made for this game, and it was quite helpful to decide which materials I need to add into the game. This is where Luke and I made first batch of props that I'd later use everywhere on the map.

<Img src="whmf/police3.png" />

<Heading title="Particles" caption="by Luke" />
Initially, we utilized legacy particles, but encountered issues with particle positions resetting to the world origin and occasional extreme random sporadic lag when setting control points.

So instead I taught myself the new particle system and attempted to work around its limitations. While I'm not entirely satisfied with the results and felt restricted, it serves its purpose.

Additionally, I created custom sprites for our particles, including both animated and static variations.

Here are the finaly particles, along with some unused particles.
<ImageCollage images={["particles/blood.gif", "particles/coins.gif", "particles/dirrect_steam.gif", "particles/floor_steam.gif", "particles/dust.gif", "particles/piss.gif", "particles/piss_indication.gif", "particles/splash.gif", "particles/stinky.gif", "particles/twinkle.gif", "particles/rain.gif" ]} />

<Heading title="NPCs" caption="by ubre" />
NPCs were a huge headache, as with every gamejam I spent an absurd amount of time on it.

First off there's the question of pathfinding, our NPCs don't use pathfinding because Navmesh doesn't generate on such a big and conchplex map, we could've gotten away with it if there were no trees.
What I implemented instead is an obstacle avoidance behaviour which surprisingly works well in our setting: It won't solve mazes, but it will enter buildings and avoid anything that's in the way.

Unfortunately it's expensive, I can't just snap the NPC on the navmesh which already took collisions and terrain into account.
I have to actually check what's around the NPC and use a very expensive MoveHelper to make it navigate the world, which is why you lag inside of the city despite the aggressive culling, we can't really have more than 5 active NPCs without the FPS being impacted. In the future I'll rework it not to use MoveHelpers which are usually reserved for player controllers.

For the actual brain of the NPC, ActionGraph was the choice from the beginning, but I initially bit off more than I could chew by attempting to implement a full-on behaviour tree inside of it.

When that and all other options didn't work out, I wrote down everything NPCs needed to do and realized it wasn't much, so I just had the following actions to attach ActionGraphs to: `OnIdle`, `OnEnemyDetected`, `OnEnemyAttacked`, `OnEnemyEscaped`, `OnSpawn`, `OnDeath`. Everything else was either a node or property.

<ImageCollage images={["ubres/peeper_follow.jpg", "ubres/peeper_escape.jpg"]} />
The logic for the creepy peeper following you and the logic for attacking you

<Heading title="Yapping" caption="by Cyberagent" />

I wrote a lot of story tasks, that sorta made it in, but due to time constraints, a lot didn't end up making it in. In a future update, I am going to get with everyone and add all the story tasks.
Here is a glimpse of whats to come.
<Img src="https://i.imgur.com/1MPyjjg.png" />

I want to be a big studio game designer/producer one day, so I tried to do a lot of play-testing and feedback to my team on what I think would make it, and what wouldnt, as well as suggesting mechanics to add to make the game more interesting.

Don't get me wrong. Small Fish is a strong group, and we have many talented people. Way more talented than me, but I got a little nervous towards the last couple weeks that we weren't play testing enough. So I made it my lifes goal to test whenever possible and give feedback on errors and scope creep. I also tried to keep everyones head on straight about what they could and couldnt do. I wanted to make sure we could keep the project within the scope we had set for it.

I don't know if I managed to help out by all the micro managing I did on everyone, but I like to think that it helped greatly and made everyone realize what we could feasibly get done in time.

Other than that I am so proud of the work we did. My group is so talented and I am filled with joy everyday to be apart of it, and how special the group is makes me happier than i've ever been.

Thank you Small Fish.

<Heading title="Shaders" caption="by ceitine, matek, wheatleymf and Luke" />
Ceitine set up various shaders for this project, for the low precision vertex snapping effect, and to have point filtering. You can find many many examples of that online, its nothing new.
However there was issues with the shadow pass combined and transparency, so Luke went through and cleared up some issues surrounding that.

Wheatley also set up shader stuff for his terrain inwhich you can read more about in that section of this blog.

Ceitine also set up Dithering post processing, again nothing ground breaking but it really helps to sell the style we go for.
Here an exagerated example.

<ImageCollage images={["no_dither.jpg", "dither.jpg"]} />

<Heading h="h4" title="Censoring"/>

Ceitine and matek also did by far the most interesting shader work, Censoring.

<Img src="censored.jpg" />

<Img src="censor_camera.jpg" />
<Img src="censor_model.jpg" />
TODO TODO TODO TODO TODO
EXPLAIN THIS SHIT ITS COOL AS FUCK
TODO TODO TODO TODO TODO





<Heading title="What comes after?" caption="by ubre" />

We'll be taking a break for a while, and I'll get back to Fish School soon after.

As for My Summer Cottage, we eventually plan on releasing it on Steam, but there's a lot of work left to do.
We have a lot that was scrapped, including systems and a story, some of these are already in the game but not hooked up to anything!

We want to first fix any leftover bugs, work on the performance as much as we can, and then expand some systems so they're not shit.
Initially we planned on having hundreds of events and a month long story, but clearly we never got that far.
We have it all written down too! So what's left now is to implement it all.

See you soon!

`&gt;&lt;&#40;&#40;&#40;&deg;&gt;`
