import { create } from "zustand";
import { stateData } from "../data/stateData";
import { UsaState } from "../data/stateData.interface";

interface HoveredStateStore {
	hoveredState: UsaState;
	setHoveredState: (state: UsaState) => void;
	handleMouseEnter: (e: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
	handleMouseLeave: (e: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
	getHoveredStateId: () => UsaState["id"];
	setHoveredStateId: (id: UsaState["id"]) => void;
}

export const useHoveredState = create<HoveredStateStore>((set, get) => ({
	hoveredState: {} as UsaState,
	setHoveredState: (state) => set({ hoveredState: state }),
	setHoveredStateId: (id) => {
		const hoveredState = stateData.find((state) => state.id === id);
		if (hoveredState) {
			set({ hoveredState });
		}
	},
	handleMouseEnter: (e) => {
		const id = e.currentTarget.getAttribute("data-id");
		const hoveredState = stateData.find((state) => state.id === id);
		if (hoveredState) {
			set({ hoveredState });
		}
	},
	handleMouseLeave: () => {
		set({ hoveredState: {} as UsaState });
	},
	getHoveredStateId: () => {
		return get().hoveredState.id;
	},
}));
