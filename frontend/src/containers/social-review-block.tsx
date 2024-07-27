import SectionHeader from "@components/common/section-header";

interface ReviewProps {
	className?: string;
	sectionHeading: string
}

const SocialReviewBlock: React.FC<ReviewProps> = ({
	className = "mb-12 md:mb-12 lg:mb-14 pb-0.5 xl:pb-1.5",
	sectionHeading
}) => {
	return (
		<div className={className}>
			<SectionHeader sectionHeading={sectionHeading} />
			<iframe src="https://widget.taggbox.com/153670" style={{width:"100%",height:"700px",border:"none"}}></iframe>
		</div>
	);
};

export default SocialReviewBlock;
