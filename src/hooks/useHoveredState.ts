import { create } from "zustand";
import { stateData } from "../data/stateData";
import { UsaState } from "../data/stateData.interface";

interface HoveredStateStore {
	hoveredState: UsaState;
	setHoveredState: (state: UsaState) => void;
	handleMouseEnter: (e: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
	handleMouseLeave: (e: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
	getHoveredStateId: () => string;
}

export const useHoveredState = create<HoveredStateStore>((set, get) => ({
	hoveredState: {
		id: "",
		x: 0,
		y: 0,
		d: "",
		dataId: "",
		stateName: "",
		party: "swing",
		electoralVotes: 0,
		capital: "",
		stateSlogan: "",
	},
	setHoveredState: (state) => set({ hoveredState: state }),
	handleMouseEnter: (e) => {
		const id = e.currentTarget.getAttribute("data-id");
		const state = stateData.find((state) => state.id === id);
		if (state) {
			set({ hoveredState: state });
		}
	},
	handleMouseLeave: () => {
		set({
			hoveredState: {
				id: "",
				x: 0,
				y: 0,
				d: "",
				dataId: "",
				stateName: "",
				party: "swing",
				electoralVotes: 0,
				capital: "",
				stateSlogan: "",
			},
		});
	},
	getHoveredStateId: () => {
		return get().hoveredState.id;
	}


}));


