import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isUserProtected = ["/user", "/checkout"];
const isAdminProtected = ["/admin"];
const isEngineerProtected = ["/engineer"];

export async function middleware(request: NextRequest) {
  const role = (await cookies()).get("role")?.value || "Farmer";
  const { pathname } = request.nextUrl;

  console.log(role);

  // Check if the request is for a protected route
  if (
    (isUserProtected.some((route) => pathname.startsWith(route)) &&
      role !== "Farmer") ||
    (isAdminProtected.some((route) => pathname.startsWith(route)) &&
      role !== "Admin") ||
    (isEngineerProtected.some((route) => pathname.startsWith(route)) &&
      role !== "Engineer")
  ) {
    // Redirect to login page if not logged in or unauthorized
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to the appropriate dashboard based on role
  // if (pathname === "/") {
  //   if (role === "Admin") {
  //     return NextResponse.redirect(new URL("/admin", request.url));
  //   } else if (role === "Farmer") {
  //     return NextResponse.redirect(new URL("/user", request.url));
  //   } else if (role === "Engineer") {
  //     return NextResponse.redirect(new URL("/engineer", request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
