import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { orderId: string } },
) => {
  try {
    await connectToDB();

    const orderDetails = await Order.findById(params.orderId).populate({
      path: "products.product",
      model: Product,
    });

    if (!orderDetails) {
      return new NextResponse(JSON.stringify({ message: "Not Found" }), {
        status: 404,
      });
    }

    const customer = await Customer.findOne({ id: orderDetails.customerId });

    return NextResponse.json({ orderDetails, customer }, { status: 200 });
  } catch (error) {
    console.log("[orderId_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";