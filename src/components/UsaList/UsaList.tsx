import { FC, useState } from "react";
import { GlobalStore } from "../../stores/useGlobal.interface";
import { useGlobal } from "../../stores/useGlobal.store";
import { useHovered } from "../../stores/useHovered.store";
import { getPartyColor } from "../../utilities";
import "./UsaList.scss";

type SortOrder = "asc" | "desc";
type WinnableState = GlobalStore["fiftyStates"][0];

const sortList = (
	list: WinnableState[],
	column: keyof WinnableState,
	sortOrder: SortOrder,
) => {
	const sortFunction = (a: WinnableState, b: WinnableState) => {
		switch (column) {
			case "id":
			case "wonBy":
			case "stateName":
			case "party":
				return a[column].localeCompare(b[column]);

			case "electoralVotes":
				return a[column] - b[column];

			default:
				return 0;
		}
	};
	const sortedList = [...list].sort(sortFunction);
	return sortOrder === "desc" ? sortedList.reverse() : sortedList;
};

const getWonBy = (players: GlobalStore["players"], party: string) => {
	const player = players.find((p) => p.party === party);
	return player?.playerName || player?.party;
};

const UsaList: FC = () => {
	const fiftyStates = useGlobal((state) => state.fiftyStates);
	const players = useGlobal((state) => state.players);

	useGlobal.subscribe(({ fiftyStates }) => {
		const sortedList = sortList(fiftyStates, sortColumn, sortOrder);
		setSortableStateList(sortedList);
	});
	const hoveredState = useHovered((state) => state.getHoveredStateId());
	const setHoveredStateId = useHovered((state) => state.setHoveredStateId);
	const [sortableStateList, setSortableStateList] = useState(fiftyStates);
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
	const [sortColumn, setSortColumn] =
		useState<keyof WinnableState>("stateName");
	const sortHeaders = [
		{ column: "id", label: "Code" },
		{ column: "stateName", label: "Staat" },
		{ column: "electoralVotes", label: "KM" },
		{ column: "party", label: "P" },
		{ column: "wonBy", label: "Winnaar" },
	] as const;

	const handleClick = (column: keyof WinnableState) => {
		setSortColumn(column);
		const sortedList = sortList(sortableStateList, column, sortOrder);
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		setSortableStateList(sortedList);
	};

	return (
		<div className="usalist">
			<h2 className="state-list-header">De 50 Verenigde Staten van Amerika</h2>
			<table className="table-container">
				<thead>
					<tr className="table-header">
						{sortHeaders.map(({ column, label }) => (
							<th scope="col" key={column}>
								<button
									className="unstyled-button state-list-sort-button"
									style={{
										fontWeight: sortColumn === column ? "bold" : "normal",
									}}
									onClick={() => handleClick(column)}
									type="button"
								>
									{label}
									<span style={{ marginLeft: sortOrder && "10px" }}>
										{sortColumn === column
											? sortOrder === "asc"
												? "↓"
												: "↑"
											: ""}
									</span>
								</button>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{sortableStateList.map((state) => (
						<tr
							key={state.id}
							className={`${
								state.id === hoveredState ? "hovered-state" : ""
							} state-list-item`}
							onMouseEnter={() => setHoveredStateId(state.id)}
						>
							<td>{state.id}</td>
							<td>{state.stateName}</td>
							<td>{state.electoralVotes}</td>
							<td
								className="state-list-item-fill"
								style={{ backgroundColor: getPartyColor(state.party, "light") }}
							/>
							<td className="state-list-item-won-by">
								{getWonBy(players, state.wonBy)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UsaList;
