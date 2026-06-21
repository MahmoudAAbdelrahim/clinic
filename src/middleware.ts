import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(
  req: NextRequest
) {
  const token =
    req.cookies.get("token")?.value;

  const pathname =
    req.nextUrl.pathname;

  const authPages = [
    "/login",
    "/register",
  ];

  const protectedPages = [
    "/patient",
    "/doctor",
    "/admin",
  ];

  if (!token && protectedPages.some(
    route => pathname.startsWith(route)
  )) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  if (token) {

    try {

      const secret = new TextEncoder()
        .encode(process.env.JWT_SECRET);

      const { payload } =
        await jwtVerify(
          token,
          secret
        );

      const role =
        payload.role as string;

      // منع الذهاب للوجين أو التسجيل بعد تسجيل الدخول

      if (
        authPages.includes(pathname)
      ) {
        return NextResponse.redirect(
          new URL("/profile", req.url)
        );
      }

      // حماية الدكتور

      if (
        pathname.startsWith("/doctor") &&
        role !== "doctor"
      ) {
        return NextResponse.redirect(
          new URL("/", req.url)
        );
      }

      // حماية الأدمن

      if (
        pathname.startsWith("/admin") &&
        role !== "admin"
      ) {
        return NextResponse.redirect(
          new URL("/", req.url)
        );
      }

    } catch {

      const response =
        NextResponse.redirect(
          new URL("/login", req.url)
        );

      response.cookies.delete(
        "token"
      );

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/patient/:path*",
    "/doctor/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};