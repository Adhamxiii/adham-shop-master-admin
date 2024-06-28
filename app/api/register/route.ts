import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    await connectToDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    return new NextResponse("User is registered", { status: 200 });
  } catch (error) {
    console.log("[register_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
