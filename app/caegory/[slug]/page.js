import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import CloudinaryImage from "@/components/CloudinaryImage";

export default async function NewsDetailPage({ params }) {
  const { category, slug } = await params;

  const categoryMap = {
    "desh-videsh": "देश-विदेश",
    "jeevan-ke-rang": "जीवन के रंग",
    vividh: "विविध",
    pratirodh: "प्रतिरोध",
    "kala-sahitya": "कला-साहित्य",
    "krishi-mveshi": "कृषि-मवेशी",
  };

  if (!categoryMap[category]) notFound();
  const post = await getPostBySlug(category, slug);

  if (!post) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          होम
        </Link>
        <span className="mx-2">›</span>
        <Link href={`/${category}`} className="text-blue-600 hover:underline">
          {categoryMap[category]}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-500">{post?.title?.slice(0, 50)}...</span>
      </nav>

      <article className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4">
          <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-sm font-medium">
            {categoryMap[category]}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {post?.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-4 border-b">
          <span>
            🕐{" "}
            {new Date(post?.publishedAt || post?._createdAt).toLocaleDateString(
              "hi-IN"
            )}
          </span>
        </div>

        {post?.mainImage && (
          <div className="mb-6">
            <CloudinaryImage
              src={post.mainImage}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full rounded-lg"
              priority={true}
            />
            {post?.caption && (
              <p className="text-sm text-gray-600 mt-2 italic">
                {post.caption}
              </p>
            )}
          </div>
        )}

        <div className="prose max-w-none text-gray-800 leading-relaxed">
          <PortableText value={post?.body} />
        </div>

        <div className="mt-8 pt-6 border-t">
          <Link
            href={`/${category}`}
            className="text-blue-600 hover:underline font-medium"
          >
            ← {categoryMap[category]} की और खबरें
          </Link>
        </div>
      </article>
    </div>
  );
}