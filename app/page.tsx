import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to the T-Shirt Order App
        </h1>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {session ? (
            <>
              <Link href="/orders" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">View Orders &rarr;</h3>
                <p className="mt-4 text-xl">
                  Check your existing orders and their status.
                </p>
              </Link>
              <Link href="/orders/new" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">Create New Order &rarr;</h3>
                <p className="mt-4 text-xl">
                  Place a new t-shirt order.
                </p>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">Login &rarr;</h3>
                <p className="mt-4 text-xl">
                  Sign in to your account to manage orders.
                </p>
              </Link>
              <Link href="/register" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">Register &rarr;</h3>
                <p className="mt-4 text-xl">
                  Create a new account to start ordering.
                </p>
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
