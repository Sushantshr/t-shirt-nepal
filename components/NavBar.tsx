'use client'

import { useSession } from "next-auth/react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">T-Shirt Order App</Link>
        <div>
          {session ? (
            <>
              <Link href="/orders" className="mr-4">Orders</Link>
              {session.user?.role === "SUPERADMIN" && (
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
  )
}
