import { FC } from "react";
import useGlobalStore from "../../stores/useGlobalStore";
import "./OneTurn.scss";

interface OneTurnProps {}

const OneTurn: FC<OneTurnProps> = () => {
	const democratScore = useGlobalStore((state) => state.score.democrat);
	const republicanScore = useGlobalStore((state) => state.score.republican);

	// Game rules:
	// - Each party starts with 3 fundraising power
	// - Each party gains 1 fundraising power for every electoral vote they have
	const fundRaisingPower = {
		democrat: democratScore + 3,
		republican: republicanScore + 3,
	};

	return (
		<>
			<div className="oneturn-header">
				<span className="material-symbols-outlined">autorenew</span>
				Een Beurt
			</div>

			<div className="oneturn-body">
				<div className="oneturn-item">
					<div className="oneturn-item__power oneturn-item__power--dem">
						{fundRaisingPower.democrat}
					</div>

					<span className="material-symbols-outlined">campaign</span>
					Fundraising
					<div className="oneturn-item__power oneturn-item__power--rep">
						{fundRaisingPower.republican}
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
