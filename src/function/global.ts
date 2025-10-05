import { create } from 'zustand';

interface GlobalState {
  _user: string;
  setUser: (user: string) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  _user: '',
  setUser: (_user) => set({ _user }),
}));