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
      const redirectTo = new URL("/auth/login", request.url);
      redirectTo.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(redirectTo);
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
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: [
    "/((?!auth/login|api).*)",
  ],
};
