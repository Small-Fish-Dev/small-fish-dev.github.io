// TODO @ceitine: we should probably hook this up with the team page for contributors??!
export interface Project {
	title: string;
	description: string;
	contributors?: string[];
}

export const Projects: Project[] = [
	{
		title: 'Death Card',
		description: 'A dungeon crawler where the levels are procedurally generated voxel worlds!',
		contributors: ['ceitine', 'rndtrash', 'Grodbert']
	},
	{
		title: 'Sauna',
		description: 'A social simulator game where you play as the average Finnish man!'
	},
	{
		title: 'Bomb Survival',
		description:
			'Clone of the infamous Little Big Planet gamemode where you had to survive from bombs.',
		contributors: ['ubre', 'Grodbert', 'ceitine']
	}
];
