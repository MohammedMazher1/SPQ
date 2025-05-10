export type AppRoutes = {
  href: string;
  label: string;
  icon: string;
};
export const navRoutes = [
  {
    href: '/home',
    label: 'الصفحة الرئيسية',
    icon: 'home',
  },
  {
    href: '/orders',
    label: 'إدارة الطلبات',
    icon: 'layoutList',
  },
  {
    href: '/products',
    label: 'إدارة العروض',
    icon: 'briefcase',
  },
  {
    href: '/customers',
    label: 'إدارة العملاء',
    icon: 'users',
    disable: true,
  },
  {
    href: '/Suppliers',
    label: 'إدارة الموردين',
    icon: 'briefcase',
    disable: true,
  },
  {
    href: '/statistics',
    label: 'الإحصائيات والتقارير',
    icon: 'chartpie',
    disable: true,
  },
  {
    href: '/users',
    label: 'إدارة المستخدمين',
    icon: 'setting',
    disable: true,
  },
  {
    href: '/setting',
    label: 'تهيئة النظام',
    icon: 'dataBase',
    disable: true,
  },
];
