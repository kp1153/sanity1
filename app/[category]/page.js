export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getNewsByCategory } from "@/lib/newsService";

export default async function CategoryPage({ params }) {
  // Next.js 15 में params एक Promise है
  const { category } = await params;
  const safeCategory = decodeURIComponent(category);

  // Route को database category में convert करना
  const getDbCategoryFromRoute = (route) => {
    const categoryMap = {
      "desh-videsh": "देश-विदेश",
      pratirodh: "प्रतिरोध",
      "jeevan-ke-rang": "जीवन के रंग",
      vividh: "विविध",
    };
    return categoryMap[route] || route;
  };

  // Valid categories check करें
  const validCategories = [
    "desh-videsh",
    "pratirodh",
    "jeevan-ke-rang",
    "vividh",
  ];
  if (!validCategories.includes(safeCategory)) {
    notFound();
  }

  const dbCategory = getDbCategoryFromRoute(safeCategory);
  const posts = await getNewsByCategory(dbCategory);

  // Category का display name
  const getCategoryDisplayName = (route) => {
    const displayNames = {
      "desh-videsh": "देश-विदेश",
      pratirodh: "प्रतिरोध",
      "jeevan-ke-rang": "जीवन के रंग",
      vividh: "विविध",
    };
    return displayNames[route] || route;
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {getCategoryDisplayName(safeCategory)}
        </h1>
        <p className="text-gray-600">इस श्रेणी की सभी खबरें</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600 text-center py-8">
          इस श्रेणी में अभी कोई खबर उपलब्ध नहीं है।
        </p>
      ) : (
        <div className="space-y-6">
          {posts.map((item) => (
            <article
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-md border"
            >
              <Link href={`/${safeCategory}/${encodeURIComponent(item.slug)}`}>
                <h2 className="text-2xl font-semibold text-red-600 hover:underline cursor-pointer mb-3">
                  {item.title}
                </h2>
              </Link>

              {item.images && item.images.length > 0 && item.images[0] && (
                <div className="mb-4">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {item.caption && (
                    <p className="text-sm text-gray-600 mt-2 text-center italic">
                      {item.caption}
                    </p>
                  )}
                </div>
              )}

              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html:
                    (item.content_parts
                      ? item.content_parts.join("").slice(0, 300)
                      : (item.content || "").slice(0, 300)) + "...",
                }}
              />

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleDateString("hi-IN")}
                </span>
                <Link
                  href={`/${safeCategory}/${encodeURIComponent(item.slug)}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  पूरा पढ़ें →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
