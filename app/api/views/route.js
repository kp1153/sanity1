import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const dynamic = "force-dynamic";

// Helper → सही document reference लो
async function getNewsDocRef(slug) {
  const newsCollection = collection(db, "news");
  const q = query(newsCollection, where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return doc(db, "news", querySnapshot.docs[0].id);
  }

  // fallback: slug को docId मानकर
  return doc(db, "news", slug);
}

// GET → सिर्फ views पढ़ना
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter is required" },
        { status: 400 }
      );
    }

    const docRef = await getNewsDocRef(slug);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: `No news found for slug: ${slug}` },
        { status: 404 }
      );
    }

    const currentViews = docSnap.data().views ?? 0;
    return NextResponse.json({ slug, views: currentViews });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch views", details: err.message },
      { status: 500 }
    );
  }
}

// POST → views increment करना
export async function POST(request) {
  try {
    const { slug } = await request.json();
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const docRef = await getNewsDocRef(slug);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: `No news found for slug: ${slug}` },
        { status: 404 }
      );
    }

    // अगर views field missing है तो पहले 0 पर सेट करो
    if (docSnap.data().views === undefined) {
      await updateDoc(docRef, { views: 0 });
    }

    // अब increment करो
    await updateDoc(docRef, { views: increment(1) });

    // Updated value fetch करो
    const updatedDoc = await getDoc(docRef);
    const updatedViews = updatedDoc.data().views ?? 1;

    return NextResponse.json({ slug, views: updatedViews });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to increment views", details: err.message },
      { status: 500 }
    );
  }
}
