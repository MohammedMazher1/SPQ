'use client';
import { useEffect, useState } from 'react';
import { ChevronRight, House } from 'lucide-react';
import UserAccount from './userAccount';
import MobileSideBar from './mobileSideBar';
import Image from 'next/image';
import { useSideBarCollapseStateStore } from '@/store/zustand/store';
import { usePathname } from 'next/navigation';
import { findRoute } from '@/lib/utils';
import { navRoutes } from '@/constants/navRoutes';
import { AppRoutes } from '@/constants/navRoutes';
import NotificationDialog from './notificationDialog';

// type Prop = {
//   user: User
// }
export default function Navbar() {
  const pathName = usePathname();
  const [breadcrumbElements, setBreadcrumbElements] = useState<AppRoutes>();
  useEffect(() => {
    const route = findRoute(pathName, navRoutes);
    if (route) {
      setBreadcrumbElements(route);
    }
  }, [pathName]);

  const collapse = useSideBarCollapseStateStore(state => state.collapse);
  const setCollapse = useSideBarCollapseStateStore(state => state.setCollapse);

  return (
    <nav className="flex h-20 items-center justify-between space-y-2 border-b bg-white p-4">
      <div className="flex w-full items-center justify-between px-4 sm:hidden">
        <div className="flex items-center justify-between gap-2">
          <Image
            src="/image/logo.png"
            alt="nfasLogo"
            width={120}
            height={120}
          />
          <h1 className="hidden sm:block">تسلا الخليج للتجارة </h1>
        </div>
        <MobileSideBar />
      </div>
      <div className="flex items-center justify-between gap-1">
        <div className="hidden sm:block">
          <div className="flex items-center gap-2 p-8">
            <House
              onClick={() => setCollapse(!collapse)}
              className="cursor-pointer opacity-25"
            />
            <ChevronRight className="m-0 p-0 opacity-25" />
          </div>
        </div>
        {/* breadcrumb */}
        <div className="hidden sm:block">
          <h1 className="font-bold text-primary">
            {breadcrumbElements?.label}
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-end bg-white px-4">
        <div className="hidden items-center gap-x-3 sm:flex">
          <div className="relative cursor-pointer rounded-full bg-[#F8F8F8] p-3">
            <NotificationDialog />
          </div>
          <UserAccount />
        </div>
      </div>
    </nav>
  );
}
