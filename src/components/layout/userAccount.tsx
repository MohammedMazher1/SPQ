import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, LogOut } from 'lucide-react';
import { deleteCookies } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api/auth/logout';

const UserAccount = () => {
  const route = useRouter();
  const handleLogOut = async () => {
    await logout();
    await deleteCookies('token');
    await deleteCookies('user');
    // clear next js cache data
    window.location.reload();
    route.push('/');
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     useUser.setState({ user: userInfo.userInfo });
  //   }
  // }, [isSuccess, userInfo]);
  // if (user.name == '' && user.email == '')
  //   return <Skeleton className="h-9 w-9 rounded-full" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-fit items-center justify-between gap-x-1 rounded-md border p-2">
        <Avatar className="h-9 w-9">
          <AvatarImage src="" />
          {/* <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback> */}
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-x-2">
          <p className="text-sm font-semibold text-[#344054]">Mohammed</p>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel dir="rtl">
          <div className="flex gap-x-2">
            <Avatar className="h-9 w-9">
              <AvatarImage height={45} width={45} src="" />
              {/* <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback> */}
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-sm font-semibold text-[#344054]">Mohammed</h1>
              <p className="text-sm font-light text-[#344054]">Mohammed</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <Link href={'/rest-password'}>
          <DropdownMenuItem dir="rtl" className="cursor-pointer gap-x-1">
            <RestPassword />
            تهيئة كلمة المرور
          </DropdownMenuItem>
        </Link> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer gap-x-1 text-red-600 hover:!text-red-600"
          onClick={() => handleLogOut()}
          dir="rtl"
        >
          <LogOut size={16} />
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccount;
