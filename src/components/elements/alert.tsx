import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

type Prop = { onclose: () => void; title: string; description: string };

export default function AlertOverlay({ onclose, title, description }: Prop) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 p-4">
      <Alert className="flex w-full max-w-md flex-col bg-white p-4 shadow-lg sm:flex-row sm:items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-10 w-10 rounded-full bg-[#FEF0C7] p-2 text-orange-500" />
        </div>
        <div className="mt-2 flex-1 sm:ms-4 sm:mt-0">
          <AlertTitle className="text-lg font-semibold text-gray-900">
            {title}
          </AlertTitle>
          <AlertDescription className="mt-2 text-sm text-gray-600">
            {description}
          </AlertDescription>
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              className="w-full text-sm sm:w-32"
              type="submit"
              onClick={onclose}
            >
              إلغاء
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  );
}
