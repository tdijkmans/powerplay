import { create } from "zustand";

const menuIds = [
	"contextMenu",
	"userForm",
	"mapControl",
	"impactCardList",
] as const;

const initalMenuState = menuIds.reduce(
	(acc, menuId) => {
		acc[menuId] = { open: false, left: 0, top: 0 };
		return acc;
	},
	{} as MenuStore["menus"],
);

export const useMenu = create<MenuStore>((set, get) => ({
	menus: {
		...initalMenuState,
		userForm: { open: false, left: 0, top: 0 },
		impactCardList: { open: false, left: 0, top: 0 },
	},
	setMenuPosition: (menuId, left, top) => {
		set((state) => ({
			menus: {
				...state.menus,
				[menuId]: {
					...state.menus[menuId],
					left,
					top,
				},
			},
		}));
	},
	getMenu: (menuId) => {
		return get().menus[menuId];
	},
	closeMenu: (menuId) => {
		set((state) => ({
			menus: {
				...state.menus,
				[menuId]: {
					...state.menus[menuId],
					open: false,
				},
			},
		}));
	},
	openMenu: (menuId) => {
		// close all other menus
		const idsToClose = Object.keys(get().menus).filter((id) => id !== menuId) as (
			| typeof menuIds[number]
		)[];
		for (const id of idsToClose) {
			if (id !== menuId) {
				get().closeMenu(id);
			}
		}
		set((state) => ({
			menus: {
				...state.menus,
				[menuId]: {
					...state.menus[menuId],
					open: true,
				},
			},
		}));
	},
}));

interface MenuStore {
	menus: {
		[key in (typeof menuIds)[number]]: {
			open: boolean;
			left: number;
			top: number;
		};
	};
	setMenuPosition: (
		menuId: (typeof menuIds)[number],
		left: number,
		top: number,
	) => void;
	getMenu: (menuId: (typeof menuIds)[number]) => {
		open: boolean;
		left: number;
		top: number;
	};
	closeMenu: (menuId: (typeof menuIds)[number]) => void;
	openMenu: (menuId: (typeof menuIds)[number]) => void;
}
