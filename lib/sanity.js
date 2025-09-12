import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2024-01-01",
});

export async function getPostBySlug(category, slug) {
  return await client.fetch(
    `
    *[_type == "post" && slug.current == $slug && category->slug.current == $category][0]{
      title,
      slug,
      excerpt,
      body,
      caption,
      mainImage,
      "categorySlug": category->slug.current,
      publishedAt,
      _createdAt
    }
  `,
    { category, slug }
  );
}
