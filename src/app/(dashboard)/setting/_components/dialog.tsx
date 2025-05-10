import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface props {
  triggerLabel: string | React.ReactNode;
  dialogContent: React.ReactNode;
  formId?: string;
  className?: string;
}
export default function CreateDialog({
  triggerLabel,
  dialogContent,
  className,
}: props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-x-1">
          <DialogTitle
            className={`min-w-24 text-[16px] font-normal ${className}`}
          >
            {triggerLabel}
          </DialogTitle>
        </div>
      </DialogTrigger>
      <DialogContent className="p-4 sm:max-w-[500px] sm:rounded-[28px]">
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
}
