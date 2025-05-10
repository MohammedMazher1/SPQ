'use client';
// import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navRoutes } from '@/constants/navRoutes';
import { icons } from '../icons/icons';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSideBarCollapseStateStore } from '@/store/zustand/store';
// import { getCookies } from '@/lib/actions';

// type User = {
//   name: string;
//   role: number;
// };
export default function Sidebar() {
  const pathname = usePathname();
  const collapse = useSideBarCollapseStateStore(state => state.collapse);
  // const [user, setUser] = useState<User>();

  // useEffect(() => {
  //   const getUser = async () => {
  //     const user = await getCookies('user');
  //     // setUser(user);
  //   };
  //   getUser();
  // }, []);
  return (
    <aside
      className={cn(
        'border-l',
        'hidden h-screen w-[280px] flex-col bg-white transition ease-in-out sm:flex',
        {
          'w-fit': collapse,
        },
      )}
    >
      <div className="flex h-20 items-center justify-center border-b p-4">
        <Link
          href="/home"
          className={cn('flex items-center', {
            'justify-center': collapse,
          })}
        >
          <Image
            src="/image/logo.png"
            alt="Tesla Logo"
            width={220}
            height={220}
          />
        </Link>
      </div>
      <nav className="flex flex-1 flex-col justify-between overflow-y-auto py-4">
        <div>
          <ul className="space-y-2 px-4">
            {/* loop just 5 times */}
            {navRoutes.slice(0, 6).map((route, index) => {
              const isActive =
                pathname === route.href ||
                pathname?.startsWith(`/${route.href}/`);
              return (
                <li key={index}>
                  <Link
                    href={route.href}
                    className={cn(
                      'flex items-center rounded-lg p-2 text-base font-semibold text-gray-500 hover:bg-gray-100',
                      {
                        'bg-gray-100 text-primary': isActive,
                        'justify-center': collapse,
                      },
                    )}
                  >
                    {icons[route.icon as keyof typeof icons]}

                    {!collapse && <span className="ms-2">{route.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="border-t p-4">
        <nav>
          <ul className="space-y-2 px-4">
            {navRoutes.slice(6, 8).map((route, index) => {
              const isActive =
                pathname === route.href ||
                pathname?.startsWith(`/${route.href}/`);
              return (
                <li key={index}>
                  <Link
                    href={route.href}
                    className={cn(
                      'flex items-center rounded-lg p-2 text-base font-semibold text-gray-500 hover:bg-gray-100',
                      {
                        'bg-gray-100 text-primary': isActive,
                        'justify-center': collapse,
                      },
                    )}
                  >
                    {icons[route.icon as keyof typeof icons]}

                    {!collapse && <span className="ms-2">{route.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
