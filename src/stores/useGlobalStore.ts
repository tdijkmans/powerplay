import { create } from "zustand";
import { stateData } from "../data/stateData";

const initialScore = { republican: 0, democrat: 0, swing: 0 };

const startTotals = stateData.reduce(
	(acc, state) => ({
		republican: acc.republican + state.electoralVotes,
		democrat: acc.democrat + state.electoralVotes,
		swing: acc.swing + state.electoralVotes,
	}),
	initialScore,
);

const grandTotal =
	startTotals.republican + startTotals.democrat + startTotals.swing;

interface GlobalStore {
	score: typeof initialScore;
	grandTotal: number;
	getRepublicanProgress: () => number;
	getDemocratProgress: () => number;
	winAState: (
		party: keyof typeof initialScore,
		state: (typeof stateData)[0],
	) => void;
	loseAState: (
		party: keyof typeof initialScore,
		state: (typeof stateData)[0],
	) => void;
}

const useGlobalStore = create<GlobalStore>((set, get) => ({
	score: initialScore,
	getScore: () => {
		return get().score;
	},
	grandTotal: grandTotal,
	getGrandTotal: () => {
		return get().grandTotal;
	},
	getRepublicanProgress: () => {
		return ((get().score.republican / grandTotal) * 100) / 2;
	},
	getDemocratProgress: () => {
		return ((get().score.democrat / grandTotal) * 100) / 2;
	},
	winAState: (party, state) => {
		const { electoralVotes } = state;
		set((state) => ({
			score: {
				...state.score,
				[party]: state.score[party] + electoralVotes,
				swing: state.score.swing - electoralVotes,
			},
		}));
	},
	loseAState: (party, state) => {
		const { electoralVotes } = state;
		set((state) => ({
			score: {
				...state.score,
				[party]: state.score[party] - electoralVotes,
				swing: state.score.swing + electoralVotes,
			},
		}));
	},
}));

export default useGlobalStore;
