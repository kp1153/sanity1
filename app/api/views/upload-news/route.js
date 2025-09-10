import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request) {
  try {
    const data = await request.json();

    const content = data.content || "";
    const chunkSize = 900000;
    const contentParts = [];
    for (let i = 0; i < content.length; i += chunkSize) {
      contentParts.push(content.substring(i, i + chunkSize));
    }

    const slug = data.slug || Date.now().toString();

    const newsData = {
      ...data,
      content: null,
      content_parts: contentParts,
      created_at: new Date().toISOString(),
      views: 0,
      slug,
      featured_image_url: data.featured_image_url || null,
      featured_caption: data.featured_caption || "",
      images: data.images || [],
    };

    // ✅ अब slug ही docId है
    await setDoc(doc(db, "news", slug), newsData);

    return NextResponse.json(
      { success: true, message: "लेख सफलतापूर्वक अपलोड हुआ", docId: slug },
      { status: 200 }
    );
  } catch (error) {
    console.error("लेख अपलोड करने में त्रुटि:", error);
    return NextResponse.json(
      { success: false, message: "लेख अपलोड करने में असफल रहे" },
      { status: 500 }
    );
  }
}
