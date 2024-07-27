import React, { useState } from "react";
import Accordion from "@components/ui/accordion";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

interface ContactFormValues {
	name: string;
	email: string;
	subject: string;
	message: string;
}

const ContactForm: React.FC = () => {
	const [willowG, setWillowG] = useState(0);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactFormValues>();
	function onSubmit(values: ContactFormValues) {
		console.log(values, "contact");
	}
	const { t } = useTranslation();

	const onChange = (e: any) => {
		console.log(e.target.nextSibling.style.visibility);
		if(e.target.nextSibling.style.visibility == 'visible') {
			e.target.nextSibling.style.visibility = "hidden"
		} else {
			e.target.nextSibling.style.visibility = "visible"
		}
	}

	const willow = [
					{
						id:1,
						key:"wt",
						option:"English Willow", 
						value:"english-willow", 
						image:"https://heegasports.com/wp-content/uploads/2022/04/English-Willow.webp",
						sub_option: [
							{	
								id:1, 
								option:"Player Grade (+₹35000.00)", 
								value:"35000"
							},
							{
								id:2, 
								option:"Grade - 1 (+₹28000.00) ", 
								value:"28000"
							},
							{
								id:3, 
								option:"Grade - 2 (+₹20000.00) ", 
								value:"28000"
							},
							{
								id:4, 
								option:"Grade - 3 (+₹15000.00) ", 
								value:"28000"
							},
						]
					},
					{
						id:2,
						key:"wt",
						option:"Kashmir Willow", 
						value:"kashmir-willow", 
						image:"https://5.imimg.com/data5/SELLER/Default/2023/4/301911540/PO/TK/QA/131121917/whatsapp-image-2023-04-20-at-3-00-37-am-1--500x500.jpeg",
						sub_option: [
							{	
								id:1, 
								option:"Player Grade (+₹4800.00)", 
								value:"4800"
							},
							{
								id:2, 
								option:"Grade - 1 (+₹4000.00) ", 
								value:"28000"
							},
							{
								id:3, 
								option:"Grade - 2 (+₹2800.00) ", 
								value:"28000"
							}
						]
					}
				]


	const english_willow_grade = willow.find((e) => e.id == 2)?.sub_option

	const size = [
					{
						id:1, 
						option:"LH", 
						value:"lh", 
						image:"https://cdn.shopify.com/s/files/1/0601/2790/3979/products/a2hieghtssdcsd4_c5db67c5-f568-4682-87b0-86baad61c8a5_300x.png?v=1649321006",
						key:"size",
					},
					{
						id:2, 
						option:"SH", 
						value:"sh", 
						image:"https://cdn.shopify.com/s/files/1/0601/2790/3979/products/Image29-03-2022at15.08_7f87d2ad-06ea-4ac1-ad84-e412f3f79f74_300x.jpg?v=1649321006",
						key:"size",
					},
					{
						id:3, 
						option:"Harrow", 
						value:"harrow", 
						image:"https://cdn.shopify.com/s/files/1/0601/2790/3979/products/Image29-03-2022at15.08_7f87d2ad-06ea-4ac1-ad84-e412f3f79f74_300x.jpg?v=1649321006",
						key:"size",
					},
					{
						id:4, 
						option:"Size - 6", 
						value:"size-6", 
						image:"https://cdn.shopify.com/s/files/1/0601/2790/3979/products/Image29-03-2022at15.08_7f87d2ad-06ea-4ac1-ad84-e412f3f79f74_300x.jpg?v=1649321006",
						key:"size",
					},
					{
						id:5, 
						option:"Size - 7", 
						value:"size-7", 
						image:"https://cdn.shopify.com/s/files/1/0601/2790/3979/products/Image29-03-2022at15.08_7f87d2ad-06ea-4ac1-ad84-e412f3f79f74_300x.jpg?v=1649321006",
						key:"size", 
					}
				]

	const weight = [
		{
		  id: 1,
		  option: "1250 gm - 1290 gm",
		  value: "1250gm-1290gm",
		  key:"weight",
	  },
	  {
		  id: 2,
		  option: "1200 gm - 1240 gm",
		  value: "1200gm-1240gm",
		  key:"weight",
	  },
	  {
		  id: 3,
		  option: "1150gm - 1190 gm",
		  value: "1150gm-1190gm",
		  key:"weight",
	  },
  	]

	const sweet_spot = [
		{
			id: 1,
			option: "Low",
			value: "low",
			image: "https://heegasports.com/wp-content/uploads/2022/04/Low-Profile.webp"
		},
		{
			id: 2,
			option: "Mid",
			value: "mid",
			image: "https://heegasports.com/wp-content/uploads/2022/04/Mid-Profile.webp"
		},
		{
			id: 3,
			option: "High",
			value: "high",
			image: "https://heegasports.com/wp-content/uploads/2022/04/High-Profile.webp"
		}
	]

	const shape = [
		{
			id: 1,
			option: "Mongoose Blade",
			value: "mongoose-blade",
			image: "https://a2cricket.com/cdn/shop/files/round.png?v=1648114748"
		},
		{
			id: 2,
			option: "Normal Blade Bat",
			value: "normal-blade-bat",
			image: "https://a2cricket.com/cdn/shop/files/semi_oval..png?v=1648114749"
		}
	]

	const toe = [
		{
			id: 1,
			option: "Semi Oval",
			value: "semi-oval",
			image: "https://heegasports.com/wp-content/uploads/2022/04/Semi-Oval-Toe.webp"
		},
		{
			id: 2,
			option: "Flat",
			value: "flat",
			image: "https://heegasports.com/wp-content/uploads/2022/04/Flat-Toe.webp"
		},
		{
			id: 3,
			option: "Round",
			value: "nround",
			image: "https://heegasports.com/wp-content/uploads/2022/04/Round-Toe-f.webp"
		},
	]

	const handle = [
		{
			id: 1,
			option: "Round",
			value: "round",
			image: "https://heegasports.com/wp-content/uploads/2022/04/Handle.webp"
		},
		{
			id: 2,
			option: "Oval",
			value: "oval",
			image: ""
		},
		{
			id: 3,
			option: "Square",
			value: "square",
			image: ""
		},
	]

	const addOn = [
		{
			id: 1,
			option: "AntiScuff Sheet",
			value: "yes",
			image: ""
		},
		{
			id: 2,
			option: "Knocking",
			value: "no",
			image: ""
		},
		{
			id: 3,
			option: "Varnishing / oiling",
			value: "no",
			image: ""
		},
		{
			id: 4,
			option: "Edge Tape",
			value: "no",
			image: ""
		},
		{
			id: 5,
			option: "Toe Guard",
			value: "no",
			image: ""
		},
		{
			id: 6,
			option: "Band",
			value: "no",
			image: ""
		},
	]

	const laser_engraving = [
		{
			id: 1,
			option: "AntiScuff Sheet",
			value: "yes",
			image: "",
			type:"input"
		}
	]


	const handleClick = () => {
		console.log("hell click")
		setWillowG
	}




	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full mx-auto flex flex-col justify-center "
			noValidate
		>
			<div className="flex flex-col">
				<Accordion
					title="Willow"
					options={willow}
					filter_key={"wt"}
				/>
				<Accordion
					title="Willow Grade"
					options={english_willow_grade}
					filter_key={"wg"}
				/>
				<Accordion
					title="Size"
					options={size}
					filter_key={"size"}
				/>
				<Accordion
					title="Weight"
					options={weight}
					filter_key={"weight"}
				/>
				<Accordion
					title="Sweet Spot"
					options={sweet_spot}
					filter_key={"sp"}
				/>
				<Accordion
					title="Shape"
					options={shape}
					filter_key={"shape"}
				/>
				<Accordion
					title="Toe"
					options={toe}
					filter_key={"toe"}
				/>
				<Accordion
					title="Handle"
					options={handle}
					filter_key={"handle"}
				/>
				<Accordion
					title="Laser Engraving"
					options={laser_engraving}
					filter_key={"le"}
				/>
				<Accordion
					title="Add - Ons"
					options={addOn}
					filter_key={"addon"}
				/>
			</div>
			<div className="relative">
				<Button
					type="submit"
					className="h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
				>
					{t("common:button-add-to-cart")}
				</Button>
			</div>
		</form>
	);
};

export default ContactForm;
