import { buildUrl } from "cloudinary-build-url";

export function getCloudinaryUrl(publicId, options = {}) {
  return buildUrl(publicId, {
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
    transformations: {
      quality: "auto",
      format: "auto",
      ...options,
    },
  });
}
