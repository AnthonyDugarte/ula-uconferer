import { useUser } from "@auth0/nextjs-auth0";
import { FC } from "react";
import Link from "next/link";

export const Layout: FC = ({ children }) => {
  const { user } = useUser();

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-gray-200">
        <header className="mx-auto container p-4 flex flex-row items-center justify-between gap-2">
          <Link href="/">
            <a className="text-base text-gray-500 leading-6 font-medium hover:text-gray-600 transition-colors duration-200 py-2">
              Home
            </a>
          </Link>

          <Link href="/sessions">
            <a className="text-base text-gray-500 leading-6 font-medium hover:text-gray-600 transition-colors duration-200 py-2">
              Sessions
            </a>
          </Link>

          <Link href="/presenters">
            <a className="text-base text-gray-500 leading-6 font-medium hover:text-gray-600 transition-colors duration-200 py-2">
              Presenters
            </a>
          </Link>

          <div className="ml-auto flex items-center gap-4">
            {!!user && (
              <div>
                <span className="text-base text-gray-500 leading-6 transition-colors duration-200 py-2">
                  Welcome, <span>{user.name}</span>
                </span>
              </div>
            )}

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
      </div>

      <main className="flex flex-1 flex-col">{children}</main>

      <footer className="border-t border-gray-200 flex items-center justify-center h-14">
        <Link href="mailto:contact@uconferer.com">
          <a rel="noreferrer noopener" target="_blank">
            Contact Us
          </a>
        </Link>
      </footer>
    </div>
  );
};
