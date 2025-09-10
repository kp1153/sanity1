"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Category को route में convert करने का function
  const getCategoryRoute = (category) => {
    const routes = {
      "देश-विदेश": "desh-videsh",
      प्रतिरोध: "pratirodh",
      "जीवन के रंग": "jeevan-ke-rang",
      विविध: "vividh",
    };
    return routes[category] || category;
  };

  useEffect(() => {
    async function fetchNews() {
      try {
        setError(null);

        // Dummy data for now - replace with Sanity data later
        const data = [];

        if (!Array.isArray(data)) {
          throw new Error("Invalid data received from server");
        }

        // हमेशा latest first
        const sorted = data.sort((a, b) => {
          const dateA = new Date(a.created_at || 0);
          const dateB = new Date(b.created_at || 0);
          return dateB - dateA;
        });

        setNews(sorted);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("समाचार लोड करने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mr-4"></div>
        Loading news...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            पुनः लोड करें
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ताज़ा खबरें</h1>

      {news.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">
            अभी कोई खबर उपलब्ध नहीं है।
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            रिफ्रेश करें
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition-shadow"
            >
              {/* सभी images original size में दिखाना - कोई limit नहीं */}
              {item.images && item.images.length > 0 && (
                <div className="space-y-2">
                  {item.images.map((src, index) => (
                    <div
                      key={index}
                      className={`w-full bg-gray-100 overflow-hidden ${
                        index === 0 ? "rounded-t-lg" : "border-t"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${item.title} ${index + 1}`}
                        className="w-full h-auto object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.created_at).toLocaleDateString("hi-IN")}
                  </span>
                </div>

                <h2 className="text-xl font-semibold mb-3 line-clamp-2 leading-tight">
                  {item.title}
                </h2>

                <p className="text-gray-700 text-sm line-clamp-3 mb-4 leading-relaxed">
                  {(item.content || item.content_parts?.join("") || "")
                    .replace(/<[^>]+>/g, "")
                    .slice(0, 150)}
                  ...
                </p>

                <Link
                  href={`/${getCategoryRoute(item.category)}/${
                    item.slug || item.id
                  }`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline transition-colors"
                >
                  और पढ़ें
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
