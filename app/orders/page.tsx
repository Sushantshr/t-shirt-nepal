import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default async function Orders() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Access Denied</div>;
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <Link href="/orders/new">
        <Button className="mb-4">Create New Order</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
            <p>Category: {order.category}</p>
            <p>Size: {order.size}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
            <p>Paid Amount: ${order.paidAmount.toFixed(2)}</p>
            <p>Pending Amount: ${order.pendingAmount.toFixed(2)}</p>
            <p>Status: {order.status}</p>
            <Link href={`/orders/${order.id}`}>
              <Button className="mt-2">View Details</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}