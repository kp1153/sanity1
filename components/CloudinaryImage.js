// components/CloudinaryImage.js
import { getCldImageUrl } from "next-cloudinary";
import Image from "next/image";

export default function CloudinaryImage({
  src,
  alt,
  width = 800,
  height = 400,
  className = "",
  priority = false,
  quality = "auto",
}) {
  if (!src) return null;

  const imageUrl = getCldImageUrl({
    src: src,
    width: width,
    height: height,
    crop: "fill",
    gravity: "center",
    format: "auto",
    quality: quality,
  });

  return (
    <Image
      src={imageUrl}
      alt={alt || "News Image"}
      width={width}
      height={height}
      className={className}
      priority={priority}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    />
  );
}
