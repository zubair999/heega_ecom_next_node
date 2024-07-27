import { ILFlag } from "@components/icons/ILFlag";
import { SAFlag } from "@components/icons/SAFlag";
import { CNFlag } from "@components/icons/CNFlag";
import { USFlag } from "@components/icons/USFlag";
import { DEFlag } from "@components/icons/DEFlag";
import { ESFlag } from "@components/icons/ESFlag";



export const siteSettings = {
	name: "Heegasports",
	description:
		"Kashmir & English Willow Cricket Bat Manufacturers in Meerut. Heega sports is a manufacturing company of Cricket Bat, Balls and Protective Equipment.",
	author: {
		name: "Heegasports",
		websiteUrl: "https://heegasports.com/",
		address: "",
	},
	logo: {
		url: "/assets/images/logo-heega.jpeg",
		alt: "Heegasports",
		href: "/",
		width: 95,
		height: 90,
	},
	defaultLanguage: "en",
	currencyCode: "INR",
	site_header: {
		menu: [
			{
				id: 1,
				path: "/",
				label: "home",
			},
			{
				id: 2,
				path: "/collections",
				label: "collections",
				columns: [
					{
						id: 1,
						columnItems: [
							{
								id: 1,
								path: "/collections/cricket-bats",
								label: "cricket bat",
								columnItemItems: [
									{
										id: 1,
										path: "/collections/english-willow-bats",
										label: "english willow",
									},
									{
										id: 2,
										path: "/collections/kashmir-willow-bats",
										label: "kashmir willow",
									},
									{
										id: 3,
										path: "/collections/mongoose-bats",
										label: "mongoose bat",
									},
									{
										id: 4,
										path: "/collections/scoop-bats",
										label: "scoop bat",
									}
								],
							},
							{
								id: 2,
								path: "/search?q=footwear",
								label: "product",
								columnItemItems: [
									{
										id: 1,
										path: "/collections/cricket-kit-bag",
										label: "cricket kit bags",
									},
									{
										id: 2,
										path: "/search?q=cricket-bat",
										label: "youth cricket equipments",
									},
									{
										id: 3,
										path: "/search?q=cricket-bat",
										label: "cricket helmets",
									},
									{
										id: 4,
										path: "/search?q=cricket-bat",
										label: "cricket bat grip",
									},
									{
										id: 5,
										path: "/search?q=cricket-bat",
										label: "cricket helmets",
									},
									{
										id: 6,
										path: "/search?q=cricket-bat",
										label: "cricket bat grip",
									},
								],
							},
							
						],
					},
					{
						id: 2,
						columnItems: [
							{
								id: 1,
								path: "/search?q=cricket-bat",
								label: "cricket-accessories",
								columnItemItems: [
									{
										id: 1,
										path: "/search?q=cricket-bat",
										label: "cricket net",
									},
									{
										id: 2,
										path: "/collections/cricket-balls",
										label: "cricket ball",
									},
									{
										id: 3,
										path: "/collections/batting-gloves",
										label: "cricket gloves",
									},
									{
										id: 4,
										path: "/collections/batting-pads",
										label: "cricket pad",
									},
									{
										id: 5,
										path: "/collections/thigh-guard",
										label: "cricket thigh guard",
									}
								],
							},
						],
					}
				],
			},
			{
				id: 3,
				path: "/about",
				label: "about",
			},
			{
				id: 4,
				path: "/customize",
				label: "customize",
			},
			{
				id: 5,
				path: "/repair",
				label: "repair",
			},
			{
				id: 6,
				path: "/",
				label: "blogs",
				subMenu: [
					{
						id: 1,
						path: "/blogs",
						label: "Cricket Bats",
					}
				],
			},

		],
		mobileMenu: [
			{
				id: 1,
				path: "/",
				label: "home",
			},
			{
				id: 2,
				path: "/search?q=men-wear",
				label: "shops",
				subMenu: [
					{
						id: 1,
						path: "/search?q=top-wear",
						label: "cricket-bat",
						subMenu: [
							{
								id: 1,
								path: "/search?q=t-shit-shirtrt",
								label: "english-willow",
							},
							{
								id: 2,
								path: "/search?q=casual-shirts",
								label: "kashmir-willow",
							},
							{
								id: 3,
								path: "/search?q=formal-shirts",
								label: "mongoose-bat",
							},
							{
								id: 4,
								path: "/search?q=blazwers-coats",
								label: "scoop-bat",
							}
						],
					},
					{
						id: 4,
						path: "/search?q=western-wear",
						label: "product",
						subMenu: [
							{
								id: 1,
								path: "/search?q=dresses",
								label: "cricket-kit-bags",
							},
							{
								id: 2,
								path: "/search?q=jumpsuits",
								label: "youth-cricket-equipments",
							},
							{
								id: 3,
								path: "/search?q=tops-t-shirt",
								label: "cricket-helmets",
							},
							{
								id: 4,
								path: "/search?q=shorts-skirts",
								label: "cricket-bat-grip",
							},
							{
								id: 5,
								path: "/search?q=shurgs",
								label: "wicket-keeping-gloves",
							},
							{
								id: 6,
								path: "/search?q=blazers",
								label: "batminton-racket",
							},
						],
					},
					{
						id: 7,
						path: "/search?q=footwear",
						label: "cricket-accessories",
						subMenu: [
							{
								id: 1,
								path: "/search?q=flats",
								label: "cricket-net",
							},
							{
								id: 2,
								path: "/search?q=casual-shoes",
								label: "cricket-ball",
							},
							{
								id: 3,
								path: "/search?q=heels",
								label: "cricket-gloves",
							},
							{
								id: 4,
								path: "/search?q=boots",
								label: "cricket-pad",
							},
							{
								id: 5,
								path: "/search?q=boots",
								label: "cricket-thigh-guard",
							},
						],
					},
				],
			},
			{
				id: 3,
				path: "/about",
				label: "about",
			},
			{
				id: 4,
				path: "/about",
				label: "customize",
			},
			{
				id: 5,
				path: "/about",
				label: "repair",
			},
			// {
			// 	id: 6,
			// 	path: "/",
			// 	label: "blogs",
			// 	subMenu: [
			// 		{
			// 			id: 1,
			// 			path: "/blogs",
			// 			label: "Cricket Bats",
			// 		}
			// 	],
			// },
		],
		languageMenu: [
			{
				id: "ar",
				name: "عربى - AR",
				value: "ar",
				icon: <SAFlag width="20px" height="15px" />,
			},
			{
				id: "zh",
				name: "中国人 - ZH",
				value: "zh",
				icon: <CNFlag width="20px" height="15px" />,
			},
			{
				id: "en",
				name: "English - EN",
				value: "en",
				icon: <USFlag width="20px" height="15px" />,
			},
			{
				id: "de",
				name: "Deutsch - DE",
				value: "de",
				icon: <DEFlag width="20px" height="15px" />,
			},
			{
				id: "he",
				name: "rעברית - HE",
				value: "he",
				icon: <ILFlag width="20px" height="15px" />,
			},
			{
				id: "es",
				name: "Español - ES",
				value: "es",
				icon: <ESFlag width="20px" height="15px" />,
			},
		],
	},
};
