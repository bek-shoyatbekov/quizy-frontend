/** @format */

import { create } from "zustand";
import { User } from "../../interfaces/user.interface";
import { persist, devtools } from "zustand/middleware";

interface useAuthStore {
  user?: User | null;
  addUser: (userData: User) => void;
  removeUser: () => void;
}

export const useAuthStore = create<useAuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        addUser: (userData: User) => set({ user: userData }),
        removeUser: () => set({ user: null }),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

export default useAuthStore;
