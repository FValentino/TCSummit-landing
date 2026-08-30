import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (host.startsWith("partners.")) {
    return NextResponse.rewrite(new URL("/partners" + req.nextUrl.pathname, req.url));
  }
  return NextResponse.next();
}

// Exclude Next.js internals (_next), the app favicon and every static asset in
// public/ (svgs, videos) plus api routes from the rewrite.
export const config = {
  matcher: ["/((?!_next|favicon|next|logo|assets|images|api|file|globe|vercel|window|videos).*)"],
};