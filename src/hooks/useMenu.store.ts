import { create } from "zustand";

const menuIds = ["contextMenu", "userForm", "mapControl"] as const;

interface MenuStore {
    menus: {
        [key in (typeof menuIds)[number]]: {
            open: boolean;
            left: number;
            top: number;
        };
    };
    setMenu: (
        menuId: (typeof menuIds)[number],
        open: boolean,
        left: number,
        top: number,
    ) => void;
    setMenuOpen: (menuId: (typeof menuIds)[number], open: boolean) => void;
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
    getMenuPosition: (menuId: (typeof menuIds)[number]) => {
        left: number;
        top: number;
    };
}

const initalMenuState = menuIds.reduce(
    (acc, menuId) => {
        acc[menuId] = { open: false, left: 0, top: 0 };
        return acc;
    },
    {} as MenuStore["menus"],
)

export const useMenu = create<MenuStore>((set, get) => ({
    menus: { ...initalMenuState, userForm: { open: true, left: 0, top: 0 } },
    setMenu: (menuId, open, left, top) => {
        set((state) => ({
            menus: {
                ...state.menus,
                [menuId]: {
                    open,
                    left,
                    top,
                },
            },
        }));
    },
    setMenuOpen: (menuId, open) => {
        set((state) => ({
            menus: {
                ...state.menus,
                [menuId]: {
                    ...state.menus[menuId],
                    open,
                },
            },
        }));
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
    getMenuPosition: (menuId) => {
        const { left, top } = get().menus[menuId];
        return { left, top };
    },
}));
