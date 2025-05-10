import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ReactQueryClientProvider } from '@/context/reactQueryClientProvider';

const neoSansArabic = localFont({
  src: [
    {
      path: '../../public/fonts/Tajawal-Light.ttf',
      weight: '400',
      style: 'light',
    },
    {
      path: '../../public/fonts/Tajawal-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Tajawal-Medium.ttf',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../../public/fonts/Tajawal-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
});

export const metadata: Metadata = {
  title: 'تسلا الخليج للتجارة',
  // add favIcon
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const direction = getLangDir(locale) // change to simple func
  return (
    <html dir="rtl">
      <body
        className={`${neoSansArabic.className} min-h-screen overflow-y-scroll`}
      >
        <ReactQueryClientProvider>
          <Toaster />
          {children}
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
