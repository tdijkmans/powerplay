import { FC } from "react";
import { UsaState } from "../../data/stateData.interface";
import useGlobalStore from "../../stores/useGlobalStore";
import Card from "../Card/Card";
import "./ContextMenu.scss";

interface ContextMenuProps {
	isVisible: boolean;
	position: { top: number; left: number };
	onOptionClick: (option: UsaState["party"]) => void;
	onHide: () => void;
	state: UsaState;
}

const ContextMenu: FC<ContextMenuProps> = ({
	isVisible,
	position,
	onOptionClick,
	onHide,
	state,
}) => {
	const players = useGlobalStore((state) => state.players);
	const fiftyStates = useGlobalStore((state) => state.fiftyStates);
	const currentState = fiftyStates.find((s) => s.id === state.id);

	const republicanPrice =
		(currentState?.wonBy === "democrat"
			? 4
			: currentState?.party === "democrat"
			  ? 3
			  : currentState?.wonBy === "" || currentState?.party === "swing"
				  ? 2
				  : 1) *
		1000000 *
		(currentState?.electoralVotes || 0);

	const democratPrice =
		(currentState?.wonBy === "republican"
			? 4
			: currentState?.party === "republican"
			  ? 3
			  : currentState?.wonBy === "" || currentState?.party === "swing"
				  ? 2
				  : 1) *
		1000000 *
		(currentState?.electoralVotes || 0);

	const inUsd = (value: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(value);

	return (
		<>
			{isVisible && (
				<Card position={position} isMenu>
					<div className="context-menu-container">
						<div className="context-indicator-title">
							Kies de winnaar voor {state.stateName} ({state.electoralVotes}{" "}
							electorale stemmen)
						</div>

						{players.map((player) => (
							<div
								className="context-indicator"
								onClick={() => onOptionClick(player.party)}
								onKeyDown={() => onOptionClick(player.party)}
								key={player.party}
							>
								<div className={`context-indicator-${player.party}`} />
								<div>{player.playerName}</div>
								<div>
									Prijs:{" "}
									{inUsd(
										player.party === "democrat"
											? democratPrice
											: republicanPrice,
									)}
								</div>
							</div>
						))}

						<hr className="context-indicator-divider" />
						<div
							className="context-indicator"
							onClick={() => onOptionClick("swing")}
							onKeyDown={() => onOptionClick("swing")}
						>
							<div className="context-indicator-und" />
							<div>Onbeslist</div>
						</div>
					</div>
				</Card>
			)}

			<div
				className={`overlay ${isVisible ? "visible" : ""}`}
				onClick={onHide}
				onKeyDown={onHide}
			/>
		</>
	);
};

export default ContextMenu;
