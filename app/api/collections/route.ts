import { authOptions } from "@/lib/authOptions";
import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { title, description, image } = await request.json();

    const existingCollection = await Collection.findOne({ title });

    if (existingCollection) {
      return new Response("Collection already exists", { status: 400 });
    }

    if (!title || !image) {
      return new Response("Title and Image is required", { status: 400 });
    }

    const collection = await Collection.create({
      title,
      description,
      image,
    });

    await collection.save();

    return NextResponse.json(collection, { status: 201 });
  } catch (error) {
    console.log("[Collection_POST]", error);
    return new NextResponse("Error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    const collections = await Collection.find().sort({ createdAt: "desc" });

    return NextResponse.json(collections, { status: 200 });
  } catch (error) {
    console.log("[Collection_GET]", error);
    return new NextResponse("Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";