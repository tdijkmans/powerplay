import { FC } from "react";
import { UsaState } from "../../data/stateData.interface";
import { GlobalStore } from "../../stores/useGlobal.interface";
import { useGlobal } from "../../stores/useGlobal.store";
import { useMenu } from "../../stores/useMenu.store";
import MenuCard from "../MenuCard/MenuCard";
import "./ContextMenu.scss";

const getConversion = (
	currentState: GlobalStore["fiftyStates"][0] | undefined,
	party: "democrat" | "republican",
) => {
	const otherParty = party === "democrat" ? "republican" : "democrat";
	const factor =
		(currentState?.wonBy === otherParty && 4) ||
		(currentState?.party === otherParty && !currentState?.wonBy && 3) ||
		(!currentState?.wonBy &&
			currentState?.party !== party &&
			currentState?.party !== otherParty &&
			2) ||
		1;

	const votes = currentState?.electoralVotes || 0;
	const amount = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(factor * votes * 1000000);

	return { amount, factor };
};

interface ContextMenuProps {
	onOptionClick: (option: UsaState["party"]) => void;
	onHide: () => void;
	state: UsaState;
}

const ContextMenu: FC<ContextMenuProps> = ({
	onOptionClick,
	onHide,
	state,
}) => {
	const players = useGlobal((state) => state.players);
	const fiftyStates = useGlobal((state) => state.fiftyStates);
	const currentState = fiftyStates.find((s) => s.id === state.id);
	const isVisible = useMenu((state) => state.getMenu("contextMenu")).open;
	const { top, left } = useMenu((state) => state.getMenu("contextMenu"));

	return (
		<>
			{isVisible && (
				<MenuCard position={{ top, left }}>
					<div className="context-menu-container">
						<div className="context-menu-top">
							<h2 className="context-menu-title">Kies de winnaar van</h2>
							<button
								className="context-menu-close"
								onClick={onHide}
								onKeyDown={onHide}
								type="button"
							>
								<span className="material-symbols-outlined">close</span>
							</button>
						</div>
						<div className="context-menu-body">
							de staat{" "}
							<span className="context-menu-party">{state.stateName} </span>
							voor {state.electoralVotes} electorale stemmen.
						</div>
						<hr className="context-indicator-divider" />

						<div className="context-menu-footer">
							{players.map((player) => (
								<button
									type="button"
									key={player.party}
									className="context-menu-button"
								>
									<div
										className="context-indicator"
										onClick={() => onOptionClick(player.party)}
										onKeyDown={() => onOptionClick(player.party)}
										key={player.party}
									>
										<div className={`context-indicator-${player.party}`} />
										<div>
											{player.playerName} casht{" "}
											{getConversion(currentState, player.party).amount}

											{` (${
												getConversion(currentState, player.party).factor
											}x)`}
										</div>
									</div>
								</button>
							))}

							<button type="button" key="swing" className="context-menu-button">
								<div
									className="context-indicator"
									onClick={() => onOptionClick("swing")}
									onKeyDown={() => onOptionClick("swing")}
								>
									<div className="context-indicator-und" />
									<div>Onbeslist</div>
								</div>
							</button>
						</div>
					</div>
				</MenuCard>
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
