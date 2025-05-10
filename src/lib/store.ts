import { create } from 'zustand';

// create selectTap state
type Tap = {
  tap: string;
  setTap: (tap: string) => void;
};
export const useSelectTapStore = create<Tap>(set => ({
  tap: 'requests',
  setTap: (tap: string) => set({ tap: tap }),
}));
