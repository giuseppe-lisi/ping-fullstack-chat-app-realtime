import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("app-theme") || "business",

    setTheme: (t) => {
        localStorage.setItem("app-theme", t);
        set({ theme: t });
    },
}));
