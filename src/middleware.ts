import { NextRequest, NextResponse } from "next/server";

const path = ["/sign-in"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";
  const isAuth = !!token;

  const _path = path.find((p) => request.nextUrl.pathname.startsWith(p));

  const findPath = path.includes(_path!);

  if (!findPath) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  } else {
    if (isAuth) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/check-in",
    "/book-entry",
  ],
};
