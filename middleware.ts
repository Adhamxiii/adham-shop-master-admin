import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl;
    const isAuth = await getToken({ req: request });
    const protectedPages = ["/"];
    const isAuthPage = pathname.startsWith("/auth");
    const isProtectedPage = protectedPages.some((page) =>
      pathname.startsWith(page),
    );

    if (!isAuth && isProtectedPage) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (isAuth && isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        //     if (token?.role === "admin") {
        //       return true;
        //     }
        //     return false;
        //   },
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    "/((?!auth/login|auth/register|api).*)",
  ],
};
