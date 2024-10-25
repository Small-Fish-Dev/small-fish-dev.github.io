---
title: 'Shoot & Build: October Playtest update'
thumbnail: 'snb_playtest_promo.png'
date: '2024-10-27'
description: 'New Shoot & Build playtest is coming with tons of changes!'
publisher: 'ubre'
published: true
---

<Img src="snb_playtest_promo.png" />

**Shoot & Build** is coming back with a new playtest and plenty of changes! New weapons, tons of improvements to player animations, graphics improvements,
bug fixes, some gameplay changes, tons of UI additions and many other awesome things.

<Heading title="Playtest" />

We'll be hosting new playtest this weekend, <b>October 27th, 19:00 GMT</b>!

If you're interested, please make sure to visit our Discord! This is where we will post any updates on this playtest, as well
as (probably) hang out in voice chat. Also keep in mind that there's a small chance that not all mentioned features in this blog 
may appear in current playtest! 

<Heading title="Power Weapons" caption="by yart & wheatleymf" />
<Img src="powerweapons.png" />

Our new lovely Small Fish programmer, yart, has been working on implementing power weapons. What is it? During the match, a special cargoship will
drop supply crates that contain a random power weapon - <b>Minigun</b> or <b>Rocket Launcher</b>. Power weapons have limited amount of ammo and cannot be used
with other weapons in your loadout, (switching to other gun will automatically drop the power weapon) but in exchange they are much
more powerful than regular loadout weapons. Lets take a deeper look at them:

<Heading h="h3" title="Rocket Launcher" />
<Video src="rocketlauncher.mp4" />

<b>Rocket Launcher</b> is pretty self-explanatory! It shoots rockets! And also pretty destructive, making it
a very efficient tool to destroy enemy buildings. Rocket Launcher has a special zooming scope, which you must use before firing a rocket. Projectile is pretty slow, but explosion radius is much greater than from any other explosive in the game. Also, if you liked rocket jumping in other multiplayer games, we highly recommend you try doing it.
<Video src="rocketjump.mp4" />

<Heading h="h3" title="Minigun" />

<b>Minigun</b> is a deadly weapon up close, and still pretty intimidating at distance. It takes some time before firing, but in right hands it can easily wipe out
the entire area. Keep in mind that you'll be slower during revving up/firing state, and it has a big aimcone which makes it less effective against players
standing far away from you!

<Heading title="New Weapons (WIP)" caption="by wheatleymf" />
<Img src="newguns.png" />
These guns were sitting in game assets since early development days but weren't implemented. Now, you can try them out! Sounds are not final, however
this should be enough for now. We will listen to the feedback and adjust weapons accordingly. 
(at the moment of writing this blog, loadout selection menu isn't implemented yet but hopefully will be ready until 27th. if it isn't, we're sorry!)

- Assault Rifle
- Heavy Machine Gun
- Shotgun

<Heading title="Landmines" caption="by wheatleymf" />
<Img src="landmines.png" />

This week I have implemented landmines. They work like... landmines. If you step on an enemy landmine, you'll have a chance to break it by using your shovel.
(you can try using guns as well! but it may not end well) If you try stepping away, it will blow up, killing everyone else in the radius. If there are any other 
landmines in proximity radius, they will explode too, causing a chain reaction. 

After deploying a landmine, it will activate in one second. If you're playing a team-based gamemode, landmines will be painted by a team-specific color, so you can know 
which landmines are placed by teammates. You can't break, trigger or blow up team landmines. They also will automatically decay in 3 minutes after deploying, which 
means that you can't fill an entire map with landmines. 

Currently players have 3 landmines to place, and you cannot place more than 5 landmines in world. This means that you have to destroy/blow up existing landmines 
you've placed before deploying new ones. 

All features listed here are "work in progress", so I'll correct anything for future playtests depending on how it goes this weekend. 
Also keep in mind that I'm not a very experienced programmer, so expect tons of weird bugs with them! 

<Heading title="Player controller rework" caption="by ubre" />

Players disliked the old character controller, especially block climbing, so I shrimplemented the [Shrimple Character Controller](https://sbox.game/fish/scc)

The first thing I focused on was block climbing. The faster you move, the faster you'll be able to climb blocks, so it's _less_ annoying when sprinting and not jarring when crouching. It also uses the same logic as step climbing, making it more reliable. Plus you'll be able to climb blocks even in mid-air, which means parkour noobs don't have to fear for their lives.

Other than tweaking acceleration and jump, I was forced by our animator to make walking much slower compared to sprinting. If you have any complaints direct them to @Grodbert on Discord.

<Heading title="Health Regeneration" caption="by yart" />
Players now will slowly regenerate health if their HP is below 60. This will start taking effect if you haven't received any damage recently.

<Heading title="Medkits" caption="by wheatleymf" />
<Video src="medkits.mp4" />

I've also added respawnable medkits. Just approach them and they will restore 50 HP. Currently our system for spawnable weapons/medkits isn't complete 
so this may or may not appear in the playtest. It depends on how hard we want to hack this stuff into upcoming playtest before we've updated our internal 
map definition system. 

<Heading title="Grenade Animations" caption="by ceitine & wheatleymf" />
<Video src="grenades.mp4" />

Now throwing a grenade isn't just an instant thing, it has a proper viewmodel animation. If you decide to hold your grenade, there'll be a proper UI showing how much time is left before it blows up in your hand. This may appear as a nerf, but in exchange grenades now have a larger explosion radius.

<Heading title="Viewmodel animations" caption="by matek" />
<Video src="viewmodel.mp4" />

I find that procedural animations for view models are extremely important for first person games. It adds a layer of polish and fluidity to the view models that is essential. You'll notice that when you look around, jump, crouch, sprint, etc. all of these are procedurally done.

<Heading title="User Interface" caption="by matek" />
<ImageCollage images={["lobbies.jpg", "settings.jpg"]} />

I've been working through the mockups that wheatley has designed and implementing them. We have some interesting settings this time around allowing for the adjustment of view distance, FOV, "retro mode" and colorblind options.

<Heading title="Chat Improvements" caption="by wheatleymf" />
<Video src="chat.mp4" />

Chat was looking pretty unfinished during previous playtests, but now it's pretty much complete. I've updated the visuals and implemented team chat, so you can communicate with your team now. Press <b>TAB</b> to cycle between global/team chats.

<Heading title="Headshot Gore" caption="by yart" />
<Video src="headshot_gore_2.mp4" />
Now headshots will result in enemy's head blowing up if that shot was fatal.

<Heading title="Player Animations" caption="by Grodbert" />
Hello my name is Grodbert. Players now have proper animations! They properly hold weapons in their hands, they have animations when reloading, and they have unique animation when sprinting.

<Heading title="Water Shader Improvements" caption="by wheatleymf" />
<Video src="watah.mp4" />

This wasn't absolutely necessary, but I've made bunch of changes to water shader. It now has proper reflections, nicer normals, better foam rendering,
and colors should be a bit more fancy in general. You probably won't even notice it unless you play on a map with plenty of water, but who cares! Also, previously we were generating an unnecessarily dense water plane mesh - now it's been optimized.

<Heading title="Retro Mode" caption="by wheatleymf" />
<Video src="retromode.mp4" />
If you don't like modern graphics (or performance isn't looking good for you), you can now try retro mode! I've tried to make it look like original Ace of Spades
 as much as possible, but understandably there'll be some difference. It takes away all fancy s&box graphics features and just renders everything flat, also
 adds "classic" screen space fog.

<Heading title="Better Aiming" caption="by yart" />
<Video src="aiming.mp4" />
Weapons now offset to center properly when you're aiming.

<Heading title="Colorblind Filters" caption="by wheatleymf" />
<Video src="colorblind.mp4" />
I've added colorblind filters for deuteranopia, protanopia and tritanopia. It's available in graphics settings. Our games always lacked some accessibility features,
so this is a first little step towards them. In near future there'll be also brightness/contrast correction available.

<Heading title="Weapon Gameplay Changes" caption="by wheatleymf" />
After receiving the feedback on Kar98k and SMG during last playtest, I've made bunch of changes to these guns:
<Heading title="Kar98k" h="h3" />

- Kar98 has now a different sound, more punchy and loud
- Kar98 now leaves a tracer that stays in the air for much longer than from other guns
- Some little animation flow adjustments

<Heading title="SMG" h="h3" />

- Improved SMG animations flow, especially for reloading. Reloading now takes less time
- Shortened SMG deploy time

<Heading title="Visual Effects" caption="by wheatleymf" />

- Added explosion effect. Looks more fancy and noticeable
- Added muzzleflash effect for weapons
- Added postprocessing effect when receiving damage
- Added eject shells when firing a gun

<Heading title="What's Next?" />
We've done some good progress, although admittedly early October was pretty slow. Game is shaping up pretty well and hopefully we will be able to host
new playtest very soon. We have more cool stuff in development, so stay tuned! 

<Heading title="Misc Changes" />
There are even more changes, but they're pretty small so here's a list:

- Plenty of bug fixes! Most of them were spot during previous playtest, so thank you everyone who was there.
- Added player ragdolls after they die
- Green team is now Red. Now it's Red vs. Blue...
- Reduced air acceleration
- Added footsteps
- Reduced mesh density of a water plane
- Implemented damage indicator
- [Editor] Added "You Can Do It!" library to motivate devs
- [Editor] Removed "You Can Do It!" library (original commit: "Remove virus and unblock ceitine")
