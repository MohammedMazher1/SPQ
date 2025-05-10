import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AlignLeft, HelpCircle, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { navRoutes } from '@/constants/navRoutes';
import { icons } from '../icons/icons';
import { getCookies } from '@/lib/actions';
import { Button } from '../ui/button';
import { deleteCookies } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api/auth/logout';

type User = {
  name: string;
  role: number;
};
const MobileSideBar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<User>();
  const route = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const user = await getCookies('user');
      setUser(user);
    };
    getUser();
  }, []);
  const handleLogOut = async () => {
    await logout();
    await deleteCookies('token');
    await deleteCookies('user');
    // clear next js cache data
    window.location.reload();
    route.push('/');
  };
  return (
    <Sheet>
      <SheetTrigger className="block sm:hidden">
        <AlignLeft />
      </SheetTrigger>
      <SheetTitle className="hidden">نفس للتسويق</SheetTitle>
      <SheetContent className="p-0">
        <aside className={cn('mt-10 flex h-[94%] flex-col bg-white')}>
          <div>
            <Link href="/" className={cn('ms-2 flex items-center space-x-2')}>
              <Image
                src="/image/logo.png"
                alt="nfas-web"
                width={48}
                height={48}
              />
              <span className="text-lg font-semibold">نفس لتسويق اعمال</span>
            </Link>
          </div>
          {user && (
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-2 px-4">
                {navRoutes.map((route, index) => {
                  const isActive =
                    pathname === route.href ||
                    pathname.startsWith(`/dashboard/${route.href}/`);
                  return (
                    <li key={index}>
                      <Link
                        href={route.href}
                        className={cn(
                          'flex items-center rounded-lg p-2 text-base font-semibold text-[#344054] hover:bg-gray-100',
                          {
                            'bg-gray-100': isActive,
                          },
                          // if user is store make it display none
                          {
                            hidden: user?.role !== 1 && route.disable,
                          },
                        )}
                      >
                        {icons[route.icon as keyof typeof icons]}
                        <span className="ms-2">{route.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
          <Button
            className="cursor-pointer gap-x-1 text-red-600 hover:!text-red-600"
            onClick={() => handleLogOut()}
            dir="rtl"
          >
            <LogOut size={16} />
            تسجيل الخروج
          </Button>
          <div className="border-t p-4">
            <Link
              href="/dashboard/support"
              className={cn(
                'flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100',
              )}
            >
              <HelpCircle className="h-5 w-5" stroke="#667085" />
              <span className="ms-2">support</span>
            </Link>
          </div>
          {/* <div className="flex items-center justify-center gap-3 p-3" dir="ltr">
            <span className="text-sm text-[#475467]">Powered by</span>
            <a href="https://github.com/MohammedMazher1">Mohammed Mazhar</a>
          </div> */}
        </aside>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
