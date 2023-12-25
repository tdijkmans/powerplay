import { create } from "zustand";

const defaultZoom = {
	scale: 1.9,
	translateX: 120,
	translateY: 150,
};

export const useZoom = create<ZoomStore>((set, get) => ({
	scale: defaultZoom.scale,
	handleWheel: (e: React.WheelEvent<SVGSVGElement>) => {
		if (e.deltaY < 0) {
			set({ scale: get().scale + 0.1 });
		} else {
			set({ scale: get().scale - 0.1 });
		}
	},
	setScale: (scale: number) => set({ scale }),
	translateX: defaultZoom.translateX,
	translateY: defaultZoom.translateY,
	setTranslateX: (translateX: number) => set({ translateX }),
	setTranslateY: (translateY: number) => set({ translateY }),
	reset: () =>
		set({
			scale: defaultZoom.scale,
			translateX: defaultZoom.translateX,
			translateY: defaultZoom.translateY,
		}),
}));

interface ZoomStore {
	scale: number;
	handleWheel: (e: React.WheelEvent<SVGSVGElement>) => void;
	setScale: (scale: number) => void;
	translateX: number;
	translateY: number;
	setTranslateX: (translateX: number) => void;
	setTranslateY: (translateY: number) => void;
	reset: () => void;
}
