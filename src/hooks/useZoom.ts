
import { create } from 'zustand';


interface ZoomStore {
    scale: number;
    handleWheel: (e: React.WheelEvent<SVGSVGElement>) => void;
    setScale: (scale: number) => void;
}


export const useZoom = create<ZoomStore>((set, get) => ({
    scale: 1.2,
    handleWheel: (e: React.WheelEvent<SVGSVGElement>) => {
        if (e.deltaY > 0) {
            set({ scale: get().scale + 0.1 })
        } else {
            set({ scale: get().scale - 0.1 })
        }
    },
    setScale: (scale: number) => set({ scale }),
}));

