import { FC } from "react";
import useGlobalStore from "../../stores/useGlobalStore";
import { getPartyColor } from "../../utilities";
import "./GameScore.scss";

type GameScoreProps = Record<string, unknown>;

const GameScore: FC<GameScoreProps> = () => {
	const democratScore = useGlobalStore((state) => state.score.democrat);
	const grandTotal = useGlobalStore((state) => state.grandTotal);
	const republicanProgress = useGlobalStore(
		(state) => state.getRepublicanProgress,
	);
	const democratProgress = useGlobalStore((state) => state.getDemocratProgress);
	const republicanScore = useGlobalStore((state) => state.score.republican);

	const items = [
		{
			color: getPartyColor("republican"),
			label: "Republikeinen",
			score: `${republicanScore} (${republicanProgress()}%)`,
		},
		{
			color: getPartyColor("democrat"),
			label: "Democraten",
			score: `${democratScore} (${democratProgress()}%)`,
		},
		{
			color: getPartyColor("swing"),
			label: "Onbeslist",
			score: 0,
		},
		{
			color: "black",
			label: "Totaal",
			score: grandTotal,
		},
	].map((item) => ({
		...item,
		key: `legend-${item.label}`,
	}));

	return (
		<div className="score">
			{items.map((item) => (
				<div className="score-item" key={item.key}>
					<div className="score-item-label">
						<div
							style={{
								width: "20px",
								height: "20px",
								backgroundColor: item.color,
							}}
						/>
						<div>{item.label}</div>
					</div>
					<div className="score-item-score">{item.score}</div>
				</div>
			))}
		</div>
	);
};

export default GameScore;
