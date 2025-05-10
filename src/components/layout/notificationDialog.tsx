import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Bell } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function NotificationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Bell size={24} className="text-[#667085]" />
      </DialogTrigger>
      <DialogContent dir="rtl" className="h-5/6 w-96">
        <DialogHeader>
          <DialogTitle className="text-right">الإشعارات</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild className="text-right">
          <Card className="w-full overflow-y-scroll border-none shadow-none"></Card>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
