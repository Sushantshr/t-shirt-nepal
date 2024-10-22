import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { category, size, quantity, totalAmount, paidAmount } = body;

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      category,
      size,
      quantity,
      totalAmount,
      paidAmount,
      pendingAmount: totalAmount - paidAmount,
      status: paidAmount >= totalAmount ? "Paid" : "Pending",
    },
  });

  return NextResponse.json(order);
}