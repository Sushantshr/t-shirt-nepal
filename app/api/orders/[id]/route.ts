import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const order = await prisma.order.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { category, size, quantity, totalAmount, paidAmount } = body;

  const updatedOrder = await prisma.order.update({
    where: {
      id: params.id,
      userId: session.user.id,
    },
    data: {
      category,
      size,
      quantity,
      totalAmount,
      paidAmount,
      pendingAmount: totalAmount - paidAmount,
      status: paidAmount >= totalAmount ? "Paid" : "Pending",
    },
  });

  return NextResponse.json(updatedOrder);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.order.delete({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  return NextResponse.json({ message: "Order deleted successfully" });
}