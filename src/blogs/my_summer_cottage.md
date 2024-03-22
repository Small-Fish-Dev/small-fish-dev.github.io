---
title: 'My Summer Cottage'
thumbnail: 'bg.jpg'
date: '2024-3-20'
description: "Our submission for Facepunch's first s&box game contest!"
publisher: 'matek'
published: false
---

This is our journey on the first s&box game contest. We all think we did pretty good...

<Heading title="Interaction System" caption="by matek and ceitine" />

The interaction system is what enables every single interaction between the player and some object in the world. Essentially, every single object should allow for multiple interactions. These interactions should call a piece of code that gives them access to the player interacting and the object being interacted with. The perfect way to handle this was a component that held a property list of `Interaction` objects. The most important field in the `Interaction` object was an action graph definition. This would allow us to add interactions through the editor and define the behaviour via action graph.

Here is an example of the beer bottle object. We define an interaction "Drink" which is triggered via "mouse1".

<Img src="beer_interaction.jpg" />

Then using the `Action` property we can hookup some action graph code to trigger the functionality. In this case, the `interactor` (which is the player) receives 20 experience and the obj (the bottle) is destroyed.

<Img src="beer_actiongraph.jpg" />

There are a few cases where instead of using action graph you'd want to define these in code. One such instance is that every single item in the game should have a "Pickup" interaction by default. It'd be annoying to have to add this interaction to each object manually. During the `OnStart()` of our `ItemComponent` we would do the following...

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

We didn't have much time and a dialogue system needed to be implemented. The only thing I knew is that I wanted to use the action graph to drive the dialogue tree behaviour. With a perfectly good interaction system already built, I decided to build the dialogue system on top of the interaction system.

Here is an example of one of the dialogue interactions. You define a dialogue interaction very similarly to a regular interaction. It needs a keybind, description, and an action graph function to execute.

<Img src="dialogue_interaction.jpg" />

Then we just use the action graph function to execute any dialogue and move us to any other dialogue stage we need!

<Img src="dialogue_actiongraph.jpg" />

<Heading title="Tools & Gizmos" caption="by ceitine and ubre" />
Ubre and I spent some time adding cool gizmos and tools for our game just to make it faster to push out content.
I think they're pretty important considering the fact that we want to keep working on this game in the future.

<ImageCollage images={["hold_tool.jpg", "icon_tool.jpg", "interaction.jpg", "signal_widget.jpg"]} />

These tools helped us during the jam, and will keep doing so in the future. We even added onto our interaction system by setting up interaction bounds gizmos. This only ended up being used for the slot machine, but, maybe in the future we'll want to use it for more functionality like radio buttons.

If you have not realized already action graph played a major part with our ability to produce mass amounts of content for our game.

<Heading title="UI" caption="by wheatleymf, gio, matek and ceitine" />

Wheatley did some amazing UI designs for everything and the rest of us tried our best to make it look as good.

<Heading h="h4" title="Character Creation" caption="by ceitine" />
Initially, I wasn't sure if the designs were a bit too ambitious for what we could do in a month, but I ended up doing most of the character creation on the first week's weekend. I did do adjustments and improvements to it through out the whole contest though.

Here are the initial UI designs by wheatley, and what I managed to turn them into.
<ImageCollage images={["passport.jpg", "appearance.jpg", "dressing_up.jpg", "mugshot.jpg"]} />
<ImageCollage images={["passport_wheatley.jpg", "appearance_wheatley.jpg", "dressing_up_wheatley.jpg", "mugshot_wheatley.jpg"]} />

<Heading title="Props, items and props", caption="by Luke, wheatleymf & cyberagent" />

<Heading h="h4" title="Lukes" />
I just gathered a list of many props and made them.
I also kept stealing props from wheatleys list and making them to give him time on the map.
Overall, if someone said "hey we need X model" I would just quickly bang it out in an hour or two and thats how all these models came to be.
<ImageCollage images={["lukes/props1.jpg", "lukes/props2.jpg", "lukes/props3.jpg", "lukes/props4.jpg", "lukes/props5.jpg", "lukes/items.jpg" ]} />

<Heading title="Clothing" caption="by Luke" />
I did all the clothing. In total, counting re-skins and coloured variations i did around 96 pieces of clothing.
<ImageCollage images={["clothing1.jpg", "clothing2.jpg", "clothing3.jpg", "clothing4.jpg", "clothing5.jpg",]} />

It was just the bog standard clothing modelling process, make model, skin model to rig, make sure it fits playermodel.
However I made massive used of a Blender plugin called ["Mesh Data Transfer"](https://mmemoli.gumroad.com/l/tOKEh),
since we have a fatness morph and needed clothing to also have fatness, here is an example of it working, it worked perfect almost every time!
<Img src="morph_transfer.gif" />

Then setting up the clothing prefab, just add a skinned model renderer, then use our item equipment comonent, then set up icon and it just works!
<ImageCollage images={["clothing_prefab.jpg", "clothing_icon.jpg"]} />

<Heading title="Particles" caption="by Luke" />
Initially, we utilized legacy particles, but encountered issues with particle positions resetting to the world origin and occasional extreme random sporadic lag when setting control points. 

So instead I taught myself the new particle system and attempted to work around its limitations. While I'm not entirely satisfied with the results and felt restricted, it serves its purpose.

Additionally, I created custom sprites for our particles, including both animated and static variations. 

Here are the finaly particles, along with some unused particles.
<ImageCollage images={["particles/blood.gif", "particles/coins.gif", "particles/dirrect_steam.gif", "particles/floor_steam.gif", "particles/dust.gif", "particles/piss.gif", "particles/piss_indication.gif", "particles/splash.gif", "particles/stinky.gif", "particles/twinkle.gif" ]} />