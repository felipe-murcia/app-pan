import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'user';

export interface User {
  id: number | null;
  nombre: string;
  role: UserRole | '';
}

interface UserState {
  user: User;
  setUser: (newUser: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        id: null,
        nombre: '',
        role: '',
      },
      setUser: (newUser) => set({ user: newUser }),
      clearUser: () =>
        set({
          user: {
            id: null,
            nombre: '',
            role: '',
          },
        }),
    }),
    {
      name: 'user-storage', // localStorage key
    }
  )
);

export default useUserStore;

