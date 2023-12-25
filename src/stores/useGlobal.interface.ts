import { UsaState } from "../data/stateData.interface";

type Republican = {
	party: "republican";
	playerName: string;
	score: number;
};

type Democrat = {
	party: "democrat";
	playerName: string;
	score: number;
};

type Players = [Republican, Democrat];

type WinnableState = UsaState & {
	wonBy: "" | "republican" | "democrat" | "swing";
};

export interface GlobalStore {
	score: {
		republican: number;
		democrat: number;
		swing: number;
	};
	grandTotal: number;
	getRepublicanProgress: () => number;
	getDemocratProgress: () => number;
	winAState: (party: UsaState["party"], state: UsaState) => void;

	players: Players;
	setPlayerNames: (players: {
		republican: string;
		democrat: string;
	}) => void;

	setPlayers: (players: {
		republican: string;
		democrat: string;
	}) => void;
	fiftyStates: WinnableState[];
	clearPersistedStore: () => void;
}
