import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default async function Roles() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPERADMIN") {
    return <div>Access Denied</div>;
  }

  const roles = await prisma.role.findMany();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Roles Management</h1>
      <Link href="/roles/new">
        <Button className="mb-4">Create New Role</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <div key={role.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{role.name}</h2>
            <p>{role.description}</p>
            <Link href={`/roles/${role.id}`}>
              <Button className="mt-2">Edit Role</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}