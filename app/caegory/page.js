import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const categoryMap = {
    "desh-videsh": "देश-विदेश",
    "jeevan-ke-rang": "जीवन के रंग",
    vividh: "विविध",
    pratirodh: "प्रतिरोध",
    "kala-sahitya": "कला-साहित्य",
    "krishi-mveshi": "कृषि-मवेशी",
  };

  if (!categoryMap[category]) notFound();

  // यहाँ Sanity से data fetch करना होगा
  const posts = []; // Sanity data

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-red-600 mb-8">
        {categoryMap[category]}
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="md:flex">
                {post.mainImage && (
                  <div className="md:w-1/3">
                    <div className="relative h-48">
                      <Image
                        src={post.mainImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="p-6 md:w-2/3">
                  <Link href={`/${category}/${post.slug}`}>
                    <h2 className="text-xl font-semibold mb-2 hover:text-red-600 cursor-pointer">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {new Date(post._createdAt).toLocaleDateString("hi-IN")}
                    </span>
                    <span>{post.author?.name}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-red-600 mb-4">
              ट्रेंडिंग
            </h3>
            {/* Sanity trending posts */}
          </div>
        </div>
      </div>
    </div>
  );
}
