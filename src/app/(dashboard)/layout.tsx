'use client';
import '../globals.css';
import Sidebar from '@/components/layout/sideBar';
import Navbar from '@/components/layout/navBar';
import { Suspense } from 'react';
import Loading from '../loading';
// import { LayoutBreadcrumb } from '@/components/elements/layoutBreadcrumb';
// import useGetUserInfo from '@/hooks/useGetUserInfo';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { isPending } = useGetUserInfo();
  // if (isPending) return <Loading />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        {/* <div className="flex items-center gap-2 p-8">
          <House
            onClick={() => setCollapse(!collapse)}
            className="cursor-pointer opacity-25"
          />
          <ChevronRight className="m-0 p-0 opacity-25" />
        </div> */}
        <main className="flex-1 overflow-hidden overflow-y-scroll bg-[#F8F9FF] p-4">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
