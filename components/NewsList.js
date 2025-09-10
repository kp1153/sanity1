"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import Link from "next/link";

// 🔹 Category mapping (DB → URL folder)
const categoryMap = {
  "देश-विदेश": "desh-videsh",
  "जीवन के रंग": "jeevan-ke-rang",
  विविध: "vividha",
  प्रतिरोध: "pratirodh",
};

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);

        const snapshot = await getDocs(collection(db, "news"));
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 🔹 Latest first (created_at is string)
        items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setNews(items);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("खबरें लोड करने में समस्या हुई");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) return <p>📡 Loading news...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  if (news.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-300 rounded">
        😕 कोई खबर नहीं मिली! आप पहली खबर{" "}
        <Link
          href="/admin/create"
          className="text-blue-600 underline hover:text-blue-800"
        >
          यहाँ पोस्ट करें
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {news.map((item) => (
        <article
          key={item.id}
          className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            {item.title}
          </h2>

          {Array.isArray(item.images) && item.images.length > 0 && (
            <img
              src={item.images[0]}
              alt={item.caption || item.title}
              className="w-full h-48 object-cover rounded-md mb-3"
              loading="lazy"
            />
          )}

          {item.caption && (
            <p className="text-gray-700 leading-relaxed mb-3">{item.caption}</p>
          )}

          <div className="flex items-center justify-between mt-2">
            {item.publishDate && (
              <time className="text-sm text-gray-500">
                📅 {new Date(item.publishDate).toLocaleDateString("hi-IN")}
              </time>
            )}

            {/* 🔹 Correct URL with mapped category */}
            <Link
              href={`/${categoryMap[item.category] || "vividha"}/${item.slug}`}
              className="text-blue-600 font-medium hover:underline"
            >
              👉 और पढ़ें
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
