'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import useLogin from '@/lib/api/auth/useLogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EyeClosedIcon, EyeIcon, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isError, error, isPending } = useLogin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <Card className="w-full max-w-sm border-none shadow-none">
      {isError && (
        <Alert className="my-3 bg-red-50" variant={'destructive'}>
          <AlertDescription className="flex items-center gap-x-2">
            <Info />
            {error?.message}
          </AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(data => mutate(data))}>
          <CardHeader>
            <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
            <CardDescription>
              الرجاء إكمال المعلومات للدخول للحساب
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* Email field */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        id="email"
                        placeholder="name@example.com"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Password field */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                        />
                        <Button
                          type="button"
                          onClick={() => setShowPassword(prev => !prev)}
                          className={cn(
                            'inset-y-0 right-0 float-left -mt-10 flex items-center bg-transparent pr-3 text-gray-500 shadow-none hover:bg-transparent focus:outline-none',
                          )}
                          aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                          }
                        >
                          {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            {/* Login Button */}
            <Button type="submit" isLoading={isPending} className="w-full">
              تسجيل الدخول
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
