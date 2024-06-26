import { FC } from "react";
import { useGlobal } from "../../stores/useGlobal.store";
import "./OneTurn.scss";

const OneTurn: FC = () => {
	const democratScore = useGlobal((state) => state.score.democrat);
	const republicanScore = useGlobal((state) => state.score.republican);
	const votesForNextLevel = (score: number) => 20 - (score % 20);

	// Game rules:
	// - Each party starts with 3 fundraising power
	// - Each party gains 1 fundraising power for every electoral vote they have
	const fundRaisingPower = {
		democrat: Math.floor(democratScore / 20) + 3,
		republican: Math.floor(republicanScore / 20) + 3,
	};

	const democratVotesForNextLevel = votesForNextLevel(democratScore);
	const republicanVotesForNextLevel = votesForNextLevel(republicanScore);

	return (
		<>
			<div className="oneturn-header">
				<span className="material-symbols-outlined">autorenew</span>
				Een Beurt
			</div>

			<div className="oneturn-body">
				<div className="oneturn-item">
					<div className="oneturn-item__power oneturn-subitem__power--dem">
						{democratVotesForNextLevel}
					</div>
					<div className="oneturn-item__power oneturn-item__power--dem">
						{fundRaisingPower.democrat}
					</div>

					<span className="material-symbols-outlined">campaign</span>
					Fundraising
					<div className="oneturn-item__power oneturn-item__power--rep">
						{fundRaisingPower.republican}
					</div>
					<div className="oneturn-item__power oneturn-subitem__power--rep">
						{republicanVotesForNextLevel}
					</div>
				</div>
				<div className="oneturn-item">
					<span className="material-symbols-outlined">payments</span>
					Cashen
					<div className="oneturn-item__subitem">of</div>
					<span className="material-symbols-outlined">stacks</span>
					Stashen
				</div>
				<div className="oneturn-item">
					<span className="material-symbols-outlined">how_to_vote</span>
					Election Day
				</div>
			</div>
		</>
	);
};

export default OneTurn;
