// components/ViewsCounter.jsx
"use client";

import { useState, useEffect } from "react";

export default function ViewsCounter({ slug }) {
  const [views, setViews] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchViews(increment = false) {
      try {
        const url = increment ? "/api/views" : `/api/views?slug=${slug}`;
        const options = increment
          ? {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ slug }),
            }
          : { method: "GET" };

        const res = await fetch(url, options);

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Failed to fetch views");
          setViews(0);
          return;
        }

        const data = await res.json();
        setViews(data.views ?? 0);
      } catch {
        setError("Network error");
        setViews(0);
      }
    }

    if (!slug) {
      setError("No slug provided");
      setViews(0);
      return;
    }

    // Check localStorage to see if user already visited this slug
    const visitedKey = `visited_${slug}`;
    const alreadyVisited = localStorage.getItem(visitedKey);

    if (alreadyVisited) {
      // सिर्फ GET call → views fetch
      fetchViews(false);
    } else {
      // First time visit → increment + save flag
      fetchViews(true);
      localStorage.setItem(visitedKey, "true");
    }
  }, [slug]);

  if (views === null) {
    return <span>👁️ loading...</span>;
  }

  if (error) {
    return <span>⚠️ {error}</span>;
  }

  return <span>👁️ {views} total views</span>;
}
