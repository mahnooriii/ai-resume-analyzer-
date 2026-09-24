const ScoreBadge = ({ score }: { score: number }) => {
	const badgeStyles =
		score > 70
			? "bg-badge-green text-green-600"
			: score > 49
				? "bg-badge-yellow text-yellow-600"
				: "bg-badge-red text-red-600";

	const label = score > 70 ? "Strong" : score > 49 ? "Good Start" : "Needs Work";

	return (
		<div className={`inline-flex rounded-full px-3 py-1 ${badgeStyles}`}>
			<p className="text-sm font-medium">{label}</p>
		</div>
	);
};

export default ScoreBadge;
