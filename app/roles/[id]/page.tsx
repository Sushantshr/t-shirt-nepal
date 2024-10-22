import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import RoleEditForm from '@/components/RoleEditForm';

export default async function RoleDetails({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPERADMIN") {
    return <div>Access Denied</div>;
  }

  const role = await prisma.role.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!role) {
    return <div>Role not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Role Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p><strong>Role ID:</strong> {role.id}</p>
        <p><strong>Name:</strong> {role.name}</p>
        <p><strong>Description:</strong> {role.description}</p>
        <p><strong>Created At:</strong> {role.createdAt.toLocaleString()}</p>
        <p><strong>Updated At:</strong> {role.updatedAt.toLocaleString()}</p>
      </div>
      <RoleEditForm role={role} />
      <Link href="/roles">
        <Button className="mt-4">Back to Roles</Button>
      </Link>
    </div>
  );
}