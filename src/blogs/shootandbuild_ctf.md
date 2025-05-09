---
title: 'Shoot & Build: Capture the Flag!'
thumbnail: 'snb_playtest_ctf.png'
date: '2024-11-14'
description: 'New gamemode, new tools, new gun, new maps, new playtest! All coming in a new game update.'
publisher: 'wheatleymf'
published: true
---

<Img src="snb_playtest_ctf.png" />

<b>Shoot and Build</b> is receiving another nice update this November. This time, we are playtesting <b>Capture the Flag</b> gamemode, more in-depth gunplay changes, proper gamemode loops, new maps, new tools and a new secondary gun.

<Heading title="Playtest" />
New playtest is coming <b>November 16th, 19:00 GMT!</b> This time it will be hostead for 4 hours, so even if you won't be able to join us at the start, there'll be enough time for you to hop in later anyway.  

As always, there are more details about the event in our Discord. If you haven't joined it yet, then do it now: <i>https://smallfi.sh/discord</i> 

<Heading title="Capture the Flag!" caption="by yart & matek" />
Capture the Flag is a new gamemode that yart has been working on. It's still work in progress, however hopefully we should be able to deliver the playable version by the time playtest starts.

This gamemode is pretty self-explanatory! Your objective is to steal enemy's flag and bring it to your spawn. But you also must defend your own flag - and for that, every match starts with a warmup where you must reinforce your side of the map as much as you can. Build walls, defensive buildings, other stuff. Everything that makes stealing your flag difficult. Team that captures the flag 3 times wins. 

<Heading title="Zombie Infection (WIP)" caption="by yart" />
Zombie Infection is another new gamemode! It's currently very early in development and has lots of missing art, but gameplay loop is here. Survivors must stay alive until time runs out, and until then zombies must infect everyone. Currently they're equipped only with a drill, and run faster than normal players. They're also capable of attacking/digging while sprinting.

Hopefully we will try it out during the playtest, but don't forget, it's all work in progress! 

<Heading title="Map Voting" caption="by yart" />
<Img src="match_end.png" />
When match is over, you will see a proper end screen showing game results. Best 3 players, highlight of the match, and 3 randomly picked maps that you can vote for. No more 30 minutes of infinite FFA on a totally levelled map! Currently some maps have missing preview image, but this is something we will take care of in near future.

<Heading title="Gunplay" caption="by yart" />
<Video src="http://files.smallfi.sh/u/sbox-dev_09-11-2024_14-31.mp4" />

We continue expanding the gunplay for Shoot and Build to ensure that every gun has it's unique use cases, upsides and downsides. To make them even more further interesting to use, we are introducing dynamic spread.

Dynamic spread allows guns to become more inaccurate from firing. Using the sights on your gun typically reduces this penalty. This inaccuracy is reduced over time. We've got plenty of variables related to this so that each weapon is better for its intended role. For example, the SMG has less base accuracy but barely penalizes spamming it from the hip. The AR however becomes quickly inaccurate from hipfire and rewards looking down the sights far more.

Guns used to have a fixed spread and static crosshair no matter what. Adding this feature allows us to balance each weapon much better and make them feel distinct from the others. You should notice a big difference in how guns feel, for the better we hope.

<Heading title="Crosshair Update" caption="by yart & matek" />
<Img src="crosshair.png" />
Crosshairs are also dynamic now. You can also change their styling in settings. When you shoot, when you jump, when you aim - it will react to your actions and update correspondingly. This should make feel gunplay easier to understand since you can now visually see how strong is your current spread.

<Heading title=".357 Revolver" caption="by wheatleymf" />
<Video src="revolver.mp4" />

I felt like this game lacks another gun that appreciates your aiming skill. This is why I have decided to add .357 Revolver - a new secondary gun. It has fast reloading, precise aiming and quicker fire rate than Kar98. It doesn't have the same effective range as Kar98k obviously, but if you are good at aiming, this gun can make you pretty deadly in short-mid distance gunfights.

<Heading title="Shovel Nerf" caption="from wheatleymf" />
Shovel is no longer as quick & strong as before. It was funny to see how people could demolish an entire building in a minute, but realistically it shouldn't be so OP. With Capture the Flag coming soon, old shovel would be too OP for it. Now it takes two hits to break a single block, also swing speed has been slowed down. To compensate this, player damage has been increased.

<Heading title="Player Buildings buff" caption="from ceitine" />
<Img src="block_buff.png"/>
Blocks placed by players now have twice more health than world blocks. Now they're much more resistant to explosions and gunshots, and this also means that it takes 4 shovel hits to break single block. This should make building your own stuff more viable in TDM/FFA, as well as heavily empower building defences in Capture the Flag.

This is an experimental change (along with shovel nerf), we will see how it performs during the playtest. But we hope that this change will give much more reasons for players to build their own reinforcements instead of relying on map environment. To avoid players building something too OP and turning CTF into stalemate, there's something new to counter new buildings...

<Heading title="Drill" caption="by wheatleymf" />
<Video src="http://files.smallfi.sh/u/sbox-dev_09-11-2024_14-27.mp4" />
I have implemented a new utility tool, Drill. It is a highly efficient block breaker that may be very useful in CTF gamemode, and probably other gamemodes too. It digs in 3x3 radius, but has shorter reach range than shovel and it takes time before it fully spins up and starts drilling, and it has limited usage. After 10-15 seconds of usage it will fully discharge. It will refill 1% every 0.7 seconds while you have it equipped. It won't charge while it's de-equipped, and won't refill on respawn. It also can hurt players.

This is understandably pretty risky for CTF and we are not entirely sure how effective it will be, so I will keep an eye on playtest feedback to make it more balanced in future. I want it to be super limited, forcing user to think wisely how, when and where do they want to use it. Dying won't instantly recharge it.

<Heading title="Hammer" caption="by ceitine & wheatleymf" />
<Video src="http://files.smallfi.sh/u/sbox-dev_09-11-2024_17-00.mp4" />

Utility now also has a hammer. It is a quick tool that allows you repairing any damaged blocks at a pretty fast rate. This isn't really useful for TDM/FFA probably, but will be very useful in CTF where player buildings will be the main factor in protecting the flag and your base. Even though hammer looks pretty threatening, you can't hurt players with it. 

<Heading title="Gear Inventory Rework" caption="by yart" />
<Img src="slots.png" />

Inventory system has been updated to improve a few backend things. First, block and shovel are now default slots, and they are always available for everyone. Weapons can be properly swapped and equipped now. Utilities are now in slot 5, and power weapons are in slot 6. Previously we had to shove block tool into utility, forcing players to choose between building, landmines, repairing blocks and drilling. Now picking utility should be better since you always can build. 

<Heading title="Preview: Small Fish World rework" caption="by CyberAgent" />
<Img src="sfw.png" />
Small Fish World is being remade. Previous iteration was far too flat and this caused a number of problems, making long range weapons especially strong on this map. Now, this map has much more terrain height difference going on, which should hopefully make gunfights more engaging.

<Heading title="New map: Highfront" caption="by wheatleymf" />
<ImageCollage images={["highfront.png", "highfront1.png", "highfront2.png"]} />
This is a new CTF map. There are two big forts, separated by thick forest and little mountains. They are not very protected, so during the warmup your goal as a team is to build as many reinforcement buildings as possible. You don't spawn next to a flag, you'll randomly appear in one of the corners on your side of the map. There are several shortcuts from spawn to the flag, however enemy team is capable of destroying them.

<Img src="highfront_top.png" />

In the middle, there's a little mirrored structure that will have one power weapon spawning on each side. They can help you sieging the enemy base, so I expect there'll be some contest for them!

<Heading title="New map: Tanker" caption="by wheatleymf" />
<Img src="tanker.png" />

This map is almost one month old, but I haven't got a chance to use it until now. This is an experimental CTF map with a flag hidden on a big ass tanker. Your task is to protect it, reinforce it, and prevent enemy team from stealing your flag. This map was developed pretty early on in Shoot & Build development, so it may feel like ass, or may not feel like ass.

<Img src="tanker_top.png" />

<Heading title="Grenade Preview & other changes" caption="by ceitine" />
<Video src="grenades.mp4" />
Now when you're deploying a grenade, you will be able to see a preview trajectory that precisely shows where and when your grenade will explode. Grenades also now have a bit more funny rotation and animations going on when hitting surfaces, since previously they were looking a bit too static.

Also throwing grenades should be much more responsive and must have a better flow now. Previously our throw animation was a bit sluggish and caused some delay between "deploy" and "throw" states. This has been changed and now flow should be much better. This also allowed us to reduce grenade explosion time from <b>4</b> to <b>2.5</b> seconds. Hopefully grenades will be more viable now!

<Heading title=".vox Importer" caption="by ceitine" />
<Img src="voximporter.png" />
Previously we were using <b>.vxl</b> format for the compatibility with Ace of Spades maps. It had plenty of downsides: slow import speed due to four nested loops, pretty annoying map size limits, as well as very weird workaround to convert our new <b>.vox</b> maps into .vxl format, which would cause bunch of headache if you don't know what are you doing.

All of this shouldn't be a problem anymore, since we natively support MagicaVoxel .vox format now. It is worth mentioning that .vox has bunch of it's own weird issues, it can be confusing sometimes, but hopefully we will resolve any importing issues as we create more maps and find out all little tricks and annoyances with the new workflow.

We still support .vxl format, and it still loads up just fine, so compatibility with Ace of Spades maps isn't going anywhere. However for this game specifically, we advise you to stick with VOX format as it provides much easier import workflow, and it loads up much faster than VXL maps. It also has much better size limits, which will allow creating large maps if necessary. 

This a nice step towards providing a good environment for creating community maps. In the near future we also plan to convert maps from s&box game resource definitions to prefabs, which should make a few specific things easier to use.

<Heading title="Input Glyphs" caption="by ceitine & wheatleymf" />
<Img src="input_glyphs.png" />
Weapon info bar now displays all available key inputs for the currently equipped gear. We've noticed that most people didn't know about 1x3 shovel dig on RMB or option to pick a color for blocks. Now you will know.

<Heading title="Block Climbing" caption="by yart" />
During previous playtests people complained a lot about movement speed slowing down when climbing, so yart changed the movement code a little so climbing doesn't slow you down too much. There's now a slight vertical boost in speed when you're climbing, which should make movement on bumpy surfaces less annoying. 

<Heading title="Killfeed Highlights" caption="by yart" />
<Img src="kill_highlight.png" />
Now when you kill someone (or die by someone), killfeed will highlight related kill info.

<Heading title="More Water Changes" caption="by wheatleymf" />
This wasn't necessary at all, but I was experimenting with procedural water normals the other day. This won't mean anything to player other than probably slightly better visuals. From technical side, previously my water shader was using precomputed normal map input textures was a little hack.

Now, as instead shader procedurally generates waves heightmap and then computes it into tangent space normals right in shader, with no manual textures. It isn't a big achievement, implementation is probably goofy, but this allows having more control over how waves look like, and I think it looks generally less "gooey"-ish than before.

<Heading title="More Accessibility Graphics" caption="by wheatleymf" />
I have slightly expanded accessibility options. You can now adjust screen saturation, brightness and contrast in case you're not happy with how game looks like by default. It can be now heavily oversaturated (just like your average Rust PVP montage clip with royalty free rap music playing at background) or look like black and white movies. Or something inbetween, that's up to you.

<Heading title="Blood Decals" caption="by yart & wheatleymf" />
Players now leave blood decals on surfaces when they get hit. Just a little fun detail.

<Heading title="Landmine Changes" caption="by wheatleymf" />
I have made some changes to the landmines.

- Max landmines reduced from 5 to 3
- You can now place landmines even if you reach the limit. When you hit the limit, last placed landmine will be automatically destroyed (with no explosion)
- Updated weapon info UI to display your current landmine count
- Landmine lifetime reduced from 3 to 2 minutes

<Heading title="Summary" caption="from wheatleymf" />
I think we've done really good job for the past 2.5 weeks. Yart is doing amazing work on gamemodes, ceitine suffered through all complicated .vox file format shenanigans and now making and importing custom maps is much easier than before, and I myself had fun with combining art & programming for implementing new gear. 

We won't talk about our plans on the release date for now, but the game is definitely shaping up really well. Visit our Discord for new announcements in the near future!

<Heading title="TL;DR" />

- New playtest on November 16th 19:00 GMT
- Implemented Capture the Flag gamemode
- Implemented Zombie Infection gamemode
- Implemented game loop for TDM/FFA
- Implemented match end screen & map vote
- Added new secondary weapon, .357 Revolver
- Implemented dynamic spread to weapons
- Many many changes to weapon accuracy and behavior
- Implemented dynamic crosshair
- Implemented styling customization for crosshairs
- Reduced shovel block damage from 100 to 50 per hit
- Reduced shovel swing speed from 0.1s to 0.5s
- Increased player block health from 100 to 200
- Added new utility tool, Drill (high efficiency block breaker)
- Added new utility tool, Hammer (repairs blocks on hit)
- Small Fish World map rework by CyberAgent
- New map: CTF Tanker, by wheatleymf
- New map: CTF Highfront, by wheatleymf
- Reduced grenade explosion time from 4.5s to 2s
- Added grenade trajectory preview while holding grenade
- Significantly improved grenade throw flow, should have no delay between deploy and hold states
- Implemented .vox map file importer (easier import, higher import speed)
- Added input glyphs (hints) for all gear
- Added blood decals spawning upon player damage
- Added screen brightness settings
- Added screen contrast settings
- Added voxel impact FX when hitting blocks with a weapon
- Reduced max landmine count from 5 to 3
- Update UI to display current amount of deployed landmines
- Reduced landmine lifetime from 3 to 2 minutes
- Last deployed landmine automatically destroys itself if player tries to place another landmine beyond the limit
- Another bunch of water shader changes
- Added command to change the current map (admin-only)
- Updated SMG anims to fix thumb clipping through gun since apparently it annoyed half of Small Fish
- More work on player animations from Grodbert, new hold types for guns
- Can pick colors from world blocks for your block tool
- Added headshot SFX
- Updated hitmarker sounds (thanks Mungus)
- Changed chat announcement notification sounds to be less similar to Windows sticky keys sound
- Piss
