import { create } from "zustand";
import { stateData } from "../data/stateData";
import { UsaState } from "../data/stateData.interface";

const initialScore = { republican: 0, democrat: 0, swing: 0 };

const startTotals = stateData.reduce(
	(acc, state) => ({
		republican: acc.republican + state.electoralVotes,
		democrat: acc.democrat + state.electoralVotes,
		swing: acc.swing + state.electoralVotes,
	}),
	initialScore,
);

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


export type WinnableState = UsaState & {
	wonBy: "" | "republican" | "democrat" | "swing";

};

const getConversionRateForRepublican = (party: WinnableState['party']) => {
	return party === 'democrat' ? 3 : party === 'swing' ? 2 : 1
}

const getConversionRateForDemocrat = (party: WinnableState['party']) => {
	return party === 'republican' ? 3 : party === 'swing' ? 2 : 1
}

const statesToWin: WinnableState[] = [...stateData]
	.sort((a, b) => a.stateName.localeCompare(b.stateName))
	.map((state) => ({
		...state,
		wonBy: "",

	}
	));

const grandTotal =
	startTotals.republican + startTotals.democrat + startTotals.swing;

export interface GlobalStore {
	score: typeof initialScore;
	grandTotal: number;
	getRepublicanProgress: () => string;
	getDemocratProgress: () => string;
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
}

const useGlobalStore = create<GlobalStore>((set, get) => ({
	players: [
		{
			nr: 1,
			party: "republican",
			playerName: "",
			score: 0,
		},
		{
			nr: 2,
			party: "democrat",
			playerName: "",
			score: 0,
		},
	],
	fiftyStates: statesToWin,
	setPlayers: (players) => {
		set((state) => ({
			players: [
				{
					...state.players[0],
					playerName: players.republican,
				},
				{
					...state.players[1],
					playerName: players.democrat,
				},
			],
		}));
	},
	setPlayerNames: (players) => {
		set((state) => ({
			players: [
				{
					...state.players[0],
					playerName: players.republican,
				},
				{
					...state.players[1],
					playerName: players.democrat,
				},
			],
		}));
	},

	score: initialScore,
	getScore: () => {
		return get().score;
	},
	grandTotal: grandTotal,
	getGrandTotal: () => {
		return get().grandTotal;
	},
	getRepublicanProgress: () => {
		return ((get().score.republican / grandTotal) * 100).toFixed(0);
	},
	getDemocratProgress: () => {
		return ((get().score.democrat / grandTotal) * 100).toFixed(0);
	},
	winAState: (party, usaState) => {
		const { electoralVotes } = usaState;
		set((state) => ({
			score: {
				...state.score,
				[party]: state.score[party] + electoralVotes,
				swing: state.score.swing - electoralVotes,
			},
		}));
		set((state) => ({
			fiftyStates: state.fiftyStates.map((s) =>
				s.id === usaState.id ? { ...s, wonBy: party } : s,
			),
		}));

		console.log("get().score", get().fiftyStates);
	},

}));

export default useGlobalStore;
