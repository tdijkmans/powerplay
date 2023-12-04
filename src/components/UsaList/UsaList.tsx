import React, { FC } from "react";
import { stateData } from "../../data/stateData";
import { getPartyColor } from "../../utilities";
import "./UsaList.scss";

type UsaListProps = Record<string, unknown>;

const UsaList: FC<UsaListProps> = () => {
	const stateList = stateData.map((s) => ({
		...s,
		fill: getPartyColor(s.party),
	}));

	const [sortableStateList, setSortableStateList] = React.useState(stateList);
	const [sortOrder, setSortOrder] = React.useState("asc");
	const [sortColumn, setSortColumn] = React.useState("id");

	return (
		<div className="UsaList">
			<div className="state-list--container">
				<h2 className="state-list--header">Amerika's 50 staten</h2>

				<div className="state-list--sort">
					<button
						className="state-list--sort__button"
						onClick={() => {
							setSortOrder(sortOrder === "asc" ? "desc" : "asc");
							setSortableStateList([...sortableStateList].reverse());
						}}
					>
						{sortOrder === "asc" ? "▲" : "▼"}
					</button>
					<button
						className="state-list--sort__button"
						style={{ fontWeight: sortColumn === "id" ? "bold" : "normal" }}
						onClick={() => {
							setSortColumn("id");
							setSortableStateList(
								[...sortableStateList].sort((a, b) => a.id.localeCompare(b.id)),
							);
						}}
					>
						Naam
					</button>
					<button
						className="state-list--sort__button"
						style={{
							fontWeight: sortColumn === "electoralVotes" ? "bold" : "normal",
						}}
						onClick={() => {
							setSortColumn("electoralVotes");
							setSortableStateList(
								[...sortableStateList].sort(
									(a, b) => a.electoralVotes - b.electoralVotes,
								),
							);
						}}
					>
						# Kiesmannen
					</button>

					<button
						className="state-list--sort__button"
						style={{ fontWeight: sortColumn === "party" ? "bold" : "normal" }}
						onClick={() => {
							setSortColumn("party");
							setSortableStateList(
								[...sortableStateList].sort((a, b) =>
									a.party.localeCompare(b.party),
								),
							);
						}}
					>
						Partij
					</button>
				</div>

				<div className="state-list">
					<div className="state-list__item state-list__item--header">Nr.</div>
					<div className="state-list__item state-list__item--header" />
					<div className="state-list__item state-list__item--header">Staat</div>
					<div className="state-list__item state-list__item--header">#</div>
					<div className="state-list__item state-list__item--header">P</div>

					{sortableStateList.map((state, index) => (
						<React.Fragment key={state.id}>
							<div className="state-list__item state-list__item--rank">
								{index + 1}
							</div>
							<div className="state-list__item state-list__item--state">
								{state.id}
							</div>
							<div className="state-list__item state-list__item--name">
								{state.stateName}
							</div>
							<div className="state-list__item state-list__item--electoral-votes">
								{state.electoralVotes}
							</div>
							<div
								className="state-list__item state-list__item--fill"
								style={{ backgroundColor: state.fill }}
							/>
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	);
};

export default UsaList;
