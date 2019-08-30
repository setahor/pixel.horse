export interface Credit {
	name: string;
	title: string;
	avatarIndex: number;
	links: string[];
}

export interface Contributor {
	name: string;
	links?: string[];
}

export interface Contributors {
	group: string;
	contributors: Contributor[];
}

export const CREDITS: Credit[] = [
	// example:
	// {
	// 	name: 'Your name',
	// 	title: 'Your role on the team',
	// 	avatarIndex: 0, // place of the avatar in /assets/images/avatars.jpg
	// 	links: ['https://twitter.com/your_twitter_handle'],
	// },
	{
		name: 'Bytewave',
		title: 'Programmer / Moderator',
		avatarIndex: 0,
		links: ['https://twitter.com/BytewaveMLP', 'https://github.com/BytewaveMLP']
	},
	{
		name: 'Cloud Hop',
		title: 'Programmer / Moderator',
		avatarIndex: 1,
		links: ['https://twitter.com/blackhole0173', 'https://github.com/blackhole12']
	},
	{
		name: 'CyberPon3',
		title: 'Programmer / Moderator',
		avatarIndex: 2,
		links: ['https://twitter.com/CyberPon3']
	},
	{
		name: 'NotMyWing',
		title: 'Programmer / Moderator',
		avatarIndex: 3,
		links: ['https://twitter.com/NotMyWing', 'https://github.com/Neeve01']
	},
	{
		name: 'Stubenhocker',
		title: 'Programmer',
		avatarIndex: 4,
		links: ['https://github.com/Stubenhocker1399']
	},
	{
		name: 'Luney',
		title: 'Programmer',
		avatarIndex: 5,
		links: ['https://twitter.com/luneythesnep', 'https://github.com/LunarMist']
	}
];

export const CONTRIBUTORS: Contributors[] = [
	{
		group: 'Artists & Animators',
		contributors: [
			{ name: 'Shino', links: ['https://www.deviantart.com/shinodage'] },
			{ name: 'ChiraChan', links: ['https://www.deviantart.com/chiramii-chan', 'https://chirachan-art.tumblr.com/'] },
			{ name: 'Goodly', links: ['https://www.deviantart.com/goodlyay'] },
			{ name: 'TioRafaJP', links: ['https://www.deviantart.com/tiorafajp', 'https://www.youtube.com/user/RafaelJP2'] },
			{ name: 'ShareMyShipment', links: ['https://www.deviantart.com/sharemyshipment'] },
			{ name: 'Velenor', links: ['https://www.deviantart.com/velenor'] },
			{ name: 'OtakuAP', links: ['https://www.deviantart.com/otakuap'] },
		],
	},
	{
		group: 'Artists',
		contributors: [
			{ name: 'Disastral' },
			{ name: 'Meno', links: ['https://www.deviantart.com/menojar'] },
			{ name: 'Paulpeoples', links: ['https://www.deviantart.com/paulpeopless'] },
			{ name: 'Velvet-Frost', links: ['https://www.deviantart.com/velvet-frost'] },
			{ name: 'Jet7Wave', links: ['https://www.deviantart.com/jetwave'] },
			{ name: 'Lalieri', links: ['https://lalieri.tumblr.com/'] },
			{ name: 'Ruef-bae', links: ['https://www.deviantart.com/ruef-bae'] },
			{ name: 'Alchemist3rd' },
			{ name: 'Firecracker' },
			{ name: 'ZippySqrl', links: ['https://www.deviantart.com/zippysqrl'] },
			{ name: 'Karnel333' },
			{ name: 'Wellfugzee' },
			{ name: 'ScribblesHeart', links: ['https://www.deviantart.com/scribblesdesu'] },
			{ name: 'dsp2003', links: ['https://dsp2003.tumblr.com/', 'http://www.deviantart.com/dsp2003'] },
			{ name: 'MysticBlare', links: ['https://twitter.com/MysticBlare'] },
			{ name: 'Towmacow Waffles', links: ['https://www.deviantart.com/towmacowwaffles'] },
			{ name: 'OrchidPony', links: ['https://www.deviantart.com/orchidpony'] },
			{ name: 'Cherry Cerise', links: ['https://www.deviantart.com/cherryceriseart'] },
			{ name: 'Radio' },
			{ name: 'Ultimate Fluff' },
			{ name: 'SC', links: ['https://0somecunt0.tumblr.com/tagged/sfw'] },
			{ name: 'SailorDolpin', links: ['https://vk.com/id324582699'] },
			{ name: 'Deeraw', links: ['https://www.deviantart.com/deerdraw', 'https://twitter.com/TheOnlyDeeraw'] },
		],
	},
];
