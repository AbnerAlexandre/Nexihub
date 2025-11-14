import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
    { path: '/login', whenAutenticated: 'redirect' },
    { path: '/register', whenAutenticated: 'redirect' },
    { path: '/complete-register', whenAutenticated: 'allow' }
]

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/login';
const REDIRECT_WHEN_AUTHENTICATED = '/';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find(route => route.path === path);

    const token = request.cookies.get('token')?.value;
    const isAuthenticated = !!token;

    // Se é rota pública com 'allow', permite acesso autenticado ou não
    if (publicRoute?.whenAutenticated === 'allow') {
        return NextResponse.next();
    }

    if (isAuthenticated && publicRoute?.whenAutenticated === 'redirect') {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED;
        return NextResponse.redirect(redirectUrl);
    }

    if (!isAuthenticated && publicRoute) {
        return NextResponse.next();
    }

    if (!isAuthenticated && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)',
    ]
}
