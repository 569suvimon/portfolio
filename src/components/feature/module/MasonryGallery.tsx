import Image from "next/image";

type ImageItem = {
  id: number;
  src: string;
  alt: string;
};

interface Props {
  images: ImageItem[];
}

export default function MasonryGallery({ images }: Props) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="break-inside-avoid overflow-hidden rounded-xl"
        >
          <div className="break-inside-avoid mb-4">
            <Image
              src={image.src}
              alt={image.alt}
              width={500}
              height={700}
              className="w-full rounded-xl"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
