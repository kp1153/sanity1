import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NewsPage({ params }) {
  const { category, slug } = await params;
  const safeSlug = decodeURIComponent(slug);
  const safeCategory = decodeURIComponent(category);

  const getDbCategoryFromRoute = (route) => {
    const categoryMap = {
      "desh-videsh": "देश-विदेश",
      pratirodh: "प्रतिरोध",
      "jeevan-ke-rang": "जीवन के रंग",
      vividh: "विविध",
    };
    return categoryMap[route] || route;
  };

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

  const news = await fetchNewsBySlugAndCategory(safeSlug, dbCategory);
  if (!news) notFound();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const content = news.content_parts
    ? news.content_parts.join("")
    : news.content;

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
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            होम
          </Link>
          <span className="mx-2">›</span>
          <Link
            href={`/${safeCategory}`}
            className="text-blue-600 hover:underline"
          >
            {getCategoryDisplayName(safeCategory)}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-500">{news.title?.slice(0, 50)}...</span>
        </nav>

        <article className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-sm font-medium">
              {news.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {news.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-4 border-b">
            <div className="flex items-center">
              <span className="mr-1">🕐</span>
              {formatDate(news.created_at)}
            </div>
            <div className="flex items-center">
              <span className="mr-1">📂</span>
              {getCategoryDisplayName(safeCategory)}
            </div>
          </div>

          {news.images &&
            Array.isArray(news.images) &&
            news.images.length > 0 && (
              <div className="mb-6 space-y-4">
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  <Image
                    src={news.images[0].trim()}
                    alt={news.title || "News Image"}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {news.images.slice(1).map((src, i) => (
                  <div
                    key={i}
                    className="relative w-full h-80 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={src.trim()}
                      alt={`${news.title || "News Image"} ${i + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                {news.caption && (
                  <p className="text-sm text-gray-600 mt-2 text-center italic">
                    {news.caption}
                  </p>
                )}
              </div>
            )}

          <div
            className="text-gray-800 leading-relaxed text-base md:text-lg prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="mt-8 pt-6 border-t">
            <Link
              href={`/${safeCategory}`}
              className="inline-flex items-center text-blue-600 hover:underline font-medium"
            >
              ← {getCategoryDisplayName(safeCategory)} की और खबरें देखें
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
