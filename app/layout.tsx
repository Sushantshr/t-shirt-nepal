import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'T-Shirt Order App',
  description: 'Manage your t-shirt orders',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">T-Shirt Order App</Link>
            <div>
              {session ? (
                <>
                  <Link href="/orders" className="mr-4">Orders</Link>
                  {session.user.role === "SUPERADMIN" && (
                    <Link href="/roles" className="mr-4">Roles</Link>
                  )}
                  <Link href="/api/auth/signout">
                    <Button variant="outline">Sign Out</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="mr-4">Login</Link>
                  <Link href="/register">
                    <Button variant="outline">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <main className="container mx-auto mt-4">
          {children}
        </main>
      </body>
    </html>
  );
}