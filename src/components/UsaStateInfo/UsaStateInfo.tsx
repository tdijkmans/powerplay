import { FC } from "react";
import { useHoveredState } from "../../hooks/useHoveredState";
import { getPartyColor } from "../../utilities";
import "./UsaStateInfo.scss";

type UsaStateInfoProps = {}

const UsaStateInfo: FC<UsaStateInfoProps> = () => {
	const hoveredState = useHoveredState((state) => state.hoveredState);
	return (
		<div className="UsaStateInfo">
			<div
				style={{
					width: "20px",
					height: "20px",
					backgroundColor: getPartyColor(hoveredState.party),
				}}
			/>
			<p>
				{hoveredState.stateSlogan} - {hoveredState.stateName} -{" "}
				{hoveredState.electoralVotes} kiesmannen
			</p>
		</div>
	);
};

export default UsaStateInfo;
