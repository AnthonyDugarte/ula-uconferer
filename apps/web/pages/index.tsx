import { withApollo } from "../lib/withApollo";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

function Home() {
  const { user } = useUser();

  return (
    <div className="container mx-auto flex flex-1 flex-col">
      <header className="border-b border-gray-200 py-4 flex flex-row items-center justify-between mb-16 sm:mb-20 -mx-4 px-4 sm:mx-0 sm:px-0">
        {!!user && (
          <div>
            <span className="text-base text-gray-500 leading-6 transition-colors duration-200 py-2">
              Welcome, <span className="font-medium">{user.name}</span>
            </span>
          </div>
        )}

        <div className="ml-auto">
          {!user && (
            <Link href="/api/auth/login">
              <a className="text-base text-gray-500 leading-6 font-medium hover:text-gray-600 transition-colors duration-200 py-2">
                Login
              </a>
            </Link>
          )}

          {!!user && (
            <Link href="/api/auth/logout">
              <a className="text-base text-gray-500 leading-6 font-medium hover:text-gray-600 transition-colors duration-200 py-2">
                Logout
              </a>
            </Link>
          )}
        </div>
      </header>

      <main className="flex flex-1 justify-center items-center py-20">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">
          Uconferer
        </h1>
      </main>

      <footer className="border-t border-gray-200 flex items-center justify-center h-14">
        <span>Uconferer</span>
      </footer>
    </div>
  );
}

export default withApollo()(Home);
