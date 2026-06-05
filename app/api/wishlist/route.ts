import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Wishlist from "../../../lib/models/Wishlist";

export async function GET() {
  try {
    await connectToDatabase();

    const wishlist = await Wishlist.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.error("Wishlist GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch wishlist",
      },
      { status: 500 }
    );
  }
}