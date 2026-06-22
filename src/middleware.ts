import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(
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
    "/profile",
    "/patient",
    "/doctor",
    "/admin",
  ];

  if (
    !token &&
    protectedPages.some(
      route =>
        pathname.startsWith(route)
    )
  ) {

    return NextResponse.redirect(
      new URL(
        "/login",
        req.url
      )
    );

  }

  if (token) {

    try {

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as {
          role: string;
        };

      const role =
        decoded.role;

      if (
        authPages.includes(
          pathname
        )
      ) {

        return NextResponse.redirect(
          new URL(
            "/profile",
            req.url
          )
        );

      }

      if (
        pathname.startsWith(
          "/doctor"
        ) &&
        role !== "doctor"
      ) {

        return NextResponse.redirect(
          new URL(
            "/",
            req.url
          )
        );

      }

      if (
        pathname.startsWith(
          "/admin"
        ) &&
        role !== "admin"
      ) {

        return NextResponse.redirect(
          new URL(
            "/",
            req.url
          )
        );

      }

    } catch {

      const response =
        NextResponse.redirect(
          new URL(
            "/login",
            req.url
          )
        );

      response.cookies.delete(
        "token"
      );

      return response;

    }

  }

  return NextResponse.next();

}
