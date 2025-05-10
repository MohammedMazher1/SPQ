// import { User } from '@/types';
import { create } from 'zustand';
import { UserInfo } from '@/types';
import { persist } from 'zustand/middleware';
export type SideBarCollapseStateStore = {
  collapse: boolean;
  setCollapse: (state: boolean) => void;
};
export const useSideBarCollapseStateStore = create<SideBarCollapseStateStore>(
  set => ({
    collapse: false,
    setCollapse: state => set({ collapse: state }),
  }),
);

export type UserInformation = {
  user: UserInfo;
  setUser: (user: UserInfo) => void;
};

// use persist to save user information in local storage
export const useUser = create<UserInformation>()(
  persist(
    set => ({
      user: {} as UserInfo,
      setUser: user => set({ user }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
