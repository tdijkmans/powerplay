import { FC } from "react";
import { UsaState } from "../../data/stateData.interface";
import { useMenu } from "../../hooks/useMenu.store";
import useGlobalStore, { WinnableState } from "../../stores/useGlobalStore";
import Card from "../Card/Card";
import "./ContextMenu.scss";

const inUsd = (
	currentState: WinnableState,
	party: "democrat" | "republican",
) => {
	const value =
		((currentState?.wonBy === party && 4) ||
			(currentState?.party === party && 3) ||
			((currentState?.wonBy === "" || currentState?.party === "swing") && 2) ||
			1) *
		1000000 *
		(currentState?.electoralVotes || 0);

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);
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
	const players = useGlobalStore((state) => state.players);
	const fiftyStates = useGlobalStore((state) => state.fiftyStates);
	const currentState = fiftyStates.find(
		(s) => s.id === state.id,
	) as WinnableState;
	const isVisible = useMenu((state) => state.getMenu("contextMenu")).open;
	const position = useMenu((state) => state.getMenuPosition("contextMenu"));

	return (
		<>
			{isVisible && (
				<Card position={position} isMenu>
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
											{inUsd(currentState, player.party)}
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
