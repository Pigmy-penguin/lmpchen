export default async function getImageUrl(id: string): Promise<ImageMetadata> {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/content/thumbnails/*.{jpg,jpeg,png,gif,webp,avif}"
  );
  const imagePath = "/src/content/thumbnails/" + id;
  if (id && !images[imagePath])
    throw new Error(`Image ${imagePath} not found in thumbnails folder`);

  return (await images[imagePath]()).default;
}
