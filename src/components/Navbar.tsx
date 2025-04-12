import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/user-monitor", label: "User Monitor" },
    { path: "/device-control", label: "Device Control" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <nav className="flex justify-between items-center bg-white shadow-md px-6 py-4 mb-6">
      <h1 className="text-xl font-bold">SafeWave</h1>
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "text-gray-600 hover:text-blue-600 transition-colors",
              location.pathname === link.path && "font-semibold text-blue-700"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
