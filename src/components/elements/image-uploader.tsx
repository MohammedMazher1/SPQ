import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Trash2, CloudUpload } from 'lucide-react';

const ImageUploader = ({
  onChange,
  className,
  prevImage,
}: {
  onChange: (e: File | undefined) => void;
  className?: string;
  prevImage?: string;
}) => {
  const [mainImage, setMainImage] = React.useState<string>('');
  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target?.files?.[0] || undefined);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    // if prevImage and if it a correct link then set mainImage
    if (prevImage && prevImage.startsWith('https')) {
      setMainImage(prevImage);
    }
  }, [prevImage]);
  return (
    <div
      className={`relative flex aspect-square flex-col items-center justify-center rounded-lg border-2 border-dashed ${className}`}
    >
      {mainImage ? (
        <>
          <Image
            src={mainImage}
            alt="main image"
            fill
            className="rounded-lg object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 z-10"
            onClick={() => {
              // set state and update onChange
              setMainImage('');
              onChange(undefined);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <label className="flex cursor-pointer flex-col items-center justify-center">
          <CloudUpload className="h-8 w-8 text-muted-foreground" />
          <span className="mt-2 text-sm text-muted-foreground">رفع صورة</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleMainImageUpload}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
