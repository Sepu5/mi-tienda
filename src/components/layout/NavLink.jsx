"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, className = "nav-link", children }) {
  const pathname = usePathname();
  const activo = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`${className} ${activo ? "active" : ""}`}
      aria-current={activo ? "page" : undefined}
    >
      {children}
    </Link>
  );
}