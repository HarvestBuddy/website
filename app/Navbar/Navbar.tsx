"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const logout = () => {
    localStorage.clear();
    setToken(null);
  };

  return (
    <div className="z-50 sticky top-0 bg-gray-200 shadow-lg">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <p>Harvest Buddy</p>
          </Link>
        </div>
        {/* Add a login button if token is null */}
        {token===null ? (
          <div className="flex-2">
            <Link href="/sign-up" className="btn btn-ghost text-xl normal-case">
              <p>Sign Up</p>
            </Link>
          </div>
        ) : (
          <div className="flex-2">
            <Link href="/" className="btn btn-ghost text-xl normal-case" onClick={logout}>
              <p>Logout</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
