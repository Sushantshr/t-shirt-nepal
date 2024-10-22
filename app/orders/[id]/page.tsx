import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import OrderEditForm from '@/components/OrderEditForm';

export default async function OrderDetails({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Access Denied</div>;
  }

  const order = await prisma.order.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Category:</strong> {order.category}</p>
        <p><strong>Size:</strong> {order.size}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
        <p><strong>Paid Amount:</strong> ${order.paidAmount.toFixed(2)}</p>
        <p><strong>Pending Amount:</strong> ${order.pendingAmount.toFixed(2)}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Created At:</strong> {order.createdAt.toLocaleString()}</p>
        <p><strong>Updated At:</strong> {order.updatedAt.toLocaleString()}</p>
      </div>
      <OrderEditForm order={order} />
      <Link href="/orders">
        <Button className="mt-4">Back to Orders</Button>
      </Link>
    </div>
  );
}