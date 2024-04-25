import { create } from "zustand";
import { persist } from "zustand/middleware";
import { stateData } from "../data/stateData";
import { GlobalStore } from "./useGlobal.interface";

const fiftyStates: GlobalStore["fiftyStates"] = [...stateData]
	.sort((a, b) => a.stateName.localeCompare(b.stateName))
	.map((state) => ({
		...state,
		wonBy: "",
	}));

const grandTotal = stateData.reduce((acc, state) => {
	return acc + state.electoralVotes;
}, 0);

export const useGlobal = create<GlobalStore>()(
	persist(
		(set, get) => ({
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
			fiftyStates,
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

			score: {
				democrat: 0,
				republican: 0,
				swing: 0,
			},
			getScore: () => {
				return get().score;
			},
			grandTotal,

			getRepublicanProgress: () => {
				return Math.round(get().score.republican / grandTotal) * 100;
			},
			getDemocratProgress: () => {
				return Math.round(get().score.democrat / grandTotal) * 100;
			},
			winAState: (party, usaState) => {
				const { electoralVotes } = usaState;
				set((state) => ({
					score: {
						...state.score,
						[party]: state.score[party] + electoralVotes,
					},
				}));
				set((state) => ({
					fiftyStates: state.fiftyStates.map((s) =>
						s.id === usaState.id ? { ...s, wonBy: party } : s,
					),
				}));
			},
			clearPersistedStore: () => {
				localStorage.removeItem("global-store");
			},
		}),
		{
			name: "global-store",
		},
	),
);
