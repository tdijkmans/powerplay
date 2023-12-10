import { FC } from "react";
import { useHoveredState } from "../../hooks/useHoveredState";
import useGlobalStore from "../../stores/useGlobalStore";
import { getPartyColor } from "../../utilities";
import "./UsaStateInfo.scss";

type UsaStateInfoProps = Record<string, unknown>;

const UsaStateInfo: FC<UsaStateInfoProps> = () => {
	const hoveredState = useHoveredState((state) => state.hoveredState);
	const fiftyStates = useGlobalStore((state) => state.fiftyStates);
	const focusedState = fiftyStates.find((s) => s.id === hoveredState.id);
	return (
		<>
			{!hoveredState.electoralVotes ? (
				<div className="usa-stateinfo">
					<div
						style={{
							width: "20px",
							height: "20px",
							backgroundColor: "#fff",
						}}
					/>
					<p>
						Klik op een staat om de kiesmannen te zien die in die staat te
						verdelen zijn.
					</p>
				</div>
			) : (
				<div className="usa-stateinfo">
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
						{(focusedState?.wonBy && (
							<>
								<br />
								<br />
								Deze staat is gewonnen door de{" "}
								{focusedState.wonBy === "republican"
									? "Republikeinen"
									: "Democraten"}
								.
							</>
						)) || (
							<>
								<br />
								<br />
								Deze staat is nog niet gewonnen.
							</>
						)}
					</p>
				</div>
			)}
		</>
	);
};

export default UsaStateInfo;
