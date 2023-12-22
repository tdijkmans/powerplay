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
	const { stateSlogan, stateName, electoralVotes, party } = hoveredState;

	return (
		<div className="usa-stateinfo-container">
			{!electoralVotes ? (
				<>
					<div
						className="usa-stateinfo__icon"
						style={{ backgroundColor: "#fff" }}
					/>
					<p>Bekijk een staat voor meer informatie.</p>
				</>
			) : (
				<>
					<div
						className="usa-stateinfo__icon"
						style={{ backgroundColor: getPartyColor(party) }}
					/>
					<p>
						{stateSlogan} - {stateName} - {electoralVotes} kiesmannen
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
				</>
			)}
		</div>
	);
};

export default UsaStateInfo;
