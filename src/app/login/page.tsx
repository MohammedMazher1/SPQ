import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import LoginForm from './_components/loginForm';
export default function LoginPage() {
  return (
    <div className="flex min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left Column - Image/Illustration */}
      <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
        <Card className="w-full max-w-sm border-none shadow-none">
          <CardContent className="flex flex-col items-center gap-1">
            <Image src={'/image/logo.png'} width={60} height={60} alt="login" />
            <p className="text-center font-bold">
              نفس لتسويق أعمال الاسر المنتجة
            </p>
            <p className="text-center text-sm font-bold text-secondary">
              nafs for marketing productive families&apos;s businessess
            </p>
          </CardContent>
        </Card>
        {/* form login component  */}
        <LoginForm />
      </div>
      {/* Right Column - Login Form */}
      <div className="hidden rounded-3xl bg-loginImage bg-contain bg-center md:block md:w-1/2"></div>
    </div>
  );
}
