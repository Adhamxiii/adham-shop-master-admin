import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";

import { Button } from "../ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const [media, setMedia] = useState<string[]>(value);

  useEffect(() => {
    setMedia(value);
  }, [value]);

  const onUpload = (result: any) => {
    const newMedia = [...media, result.info.secure_url];
    setMedia(newMedia);
    onChange(newMedia);
  };

  const handleRemove = (url: string) => {
    const newMedia = media.filter((item) => item !== url);
    setMedia(newMedia);
    onRemove(url);
  };

  console.log(value)

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {media.map((url) => (
          <div key={url} className="relative h-[200px] w-[200px]">
            <div className="absolute right-0 top-0 z-10">
              <Button
                type="button"
                onClick={() => handleRemove(url)}
                size="sm"
                className="bg-red-1 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="rounded-lg object-cover"
              fill
            />
          </div>
        ))}
      </div>

      <CldUploadWidget uploadPreset="rhcapwsj" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button
              type="button"
              onClick={() => open()}
              className="bg-grey-1 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
