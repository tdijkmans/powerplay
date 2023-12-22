import { FC } from "react";
import useGlobalStore from "../../stores/useGlobalStore";
import { getPartyColor } from "../../utilities";
import "./GameScore.scss";

type GameScoreProps = Record<string, unknown>;

const GameScore: FC<GameScoreProps> = () => {
	const players = useGlobalStore((state) => state.players);
	const [republicanPlayer, democraticPlayer] = players;
	const democratScore = useGlobalStore((state) => state.score.democrat);
	const grandTotal = useGlobalStore((state) => state.grandTotal);
	const republicanScore = useGlobalStore((state) => state.score.republican);

	const items = [
		{
			color: getPartyColor("democrat"),
			label: `Democraat ${democraticPlayer?.playerName || "Speler 1"}`,
			scoreText: `${democratScore}/${grandTotal / 2} (${(
				(democratScore / (grandTotal / 2)) * 100 || 0
			).toFixed(0)}%)`,
			score: democratScore,
		},
		{
			color: "darkgrey",
			label: "Onbeslist",
			scoreText: `${grandTotal - democratScore - republicanScore}/${grandTotal} (
				${(
					((grandTotal - democratScore - republicanScore) / grandTotal) * 100 ||
					0
				).toFixed(0)}%)`,
			score: grandTotal - democratScore - republicanScore,
		},
		{
			color: getPartyColor("republican"),
			label: `Republikein ${republicanPlayer?.playerName || "Speler 2"}`,
			scoreText: `${republicanScore}/${grandTotal / 2} (${(
				(republicanScore / (grandTotal / 2)) * 100 || 0
			).toFixed(0)}%)`,
			score: republicanScore,
		},
	].map((item) => ({
		...item,
		key: `legend-${item.label}`,
	}));

	return (
		<>
			<div className="score">
				<div className="score-header">
					<span className="material-symbols-outlined">leaderboard</span>
					<div className="score-header__title">Scorebord</div>
				</div>
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
						<div className="score-item-score">
							<span className="material-symbols-outlined">groups</span>
							{item.scoreText}
						</div>
					</div>
				))}
			</div>

			<div className="score-row">
				{items.map((i) => (
					<div
						key={`score-row-${i.key}`}
						style={{
							width: `${(i.score / grandTotal) * 100}%`,
							height: "20px",
							backgroundColor: i.color,
						}}
					/>
				))}
			</div>
		</>
	);
};

export default GameScore;
