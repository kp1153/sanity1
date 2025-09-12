import Link from "next/link";
import CloudinaryImage from "@/components/CloudinaryImage";

export default async function HomePage() {
  // यहाँ Sanity से सभी posts fetch करना होगा (latest first)
  const posts = []; // Sanity data

  const categoryRouteMap = {
    "देश-विदेश": "desh-videsh",
    "जीवन के रंग": "jeevan-ke-rang",
    विविध: "vividh",
    प्रतिरोध: "pratirodh",
    "कला-साहित्य": "kala-sahitya",
    "कृषि-मवेशी": "krishi-mveshi",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {posts.map((post) => {
              const categoryRoute = categoryRouteMap[post.category] || "vividh";

              return (
                <article
                  key={post._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="md:flex">
                    {post.mainImage && (
                      <div className="md:w-1/3">
                        <div className="relative h-48">
                          <CloudinaryImage
                            src={post.mainImage}
                            alt={post.title}
                            width={400}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    <div className="p-6 md:w-2/3">
                      <div className="mb-3">
                        <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-1 rounded text-xs font-medium">
                          {post.category}
                        </span>
                      </div>

                      <Link href={`/${categoryRoute}/${post.slug}`}>
                        <h2 className="text-xl font-semibold mb-3 hover:text-red-600 cursor-pointer transition-colors">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {post.excerpt || post.content?.slice(0, 150) + "..."}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {new Date(post._createdAt).toLocaleDateString(
                            "hi-IN"
                          )}
                        </span>
                        <span>{post.author?.name}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-red-600 mb-4 border-b border-gray-200 pb-2">
              ट्रेंडिंग
            </h3>
            <div className="space-y-4">
              {/* यहाँ Sanity से trending posts आएंगे */}
              {posts.slice(0, 5).map((post, index) => {
                const categoryRoute =
                  categoryRouteMap[post.category] || "vividh";

                return (
                  <div
                    key={post._id}
                    className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <Link href={`/${categoryRoute}/${post.slug}`}>
                        <h4 className="text-sm font-medium hover:text-red-600 cursor-pointer line-clamp-2">
                          {post.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(post._createdAt).toLocaleDateString("hi-IN")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Categories Quick Links */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-red-600 mb-4 border-b border-gray-200 pb-2">
              श्रेणियां
            </h3>
            <div className="space-y-2">
              {Object.entries(categoryRouteMap).map(([displayName, route]) => (
                <Link
                  key={route}
                  href={`/${route}`}
                  className="block text-sm text-gray-700 hover:text-red-600 hover:underline py-1"
                >
                  {displayName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
