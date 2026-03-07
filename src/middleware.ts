import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // حماية كل المسارات التي تبدأ بـ /dashboard باستثناء صفحة تسجيل الدخول نفسها
    if (pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/login')) {
        const authSession = request.cookies.get('auth_session');

        // إذا لم يكن هناك جلسة مسجلة الدخول، قم بإعادة توجيهه إلى صفحة تسجيل الدخول
        if (!authSession || authSession.value !== 'authenticated') {
            const loginUrl = new URL('/dashboard/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // السماح بالمرور إذا كانت الشروط مستوفاة
    return NextResponse.next();
}

// تحديد المسارات التي يجب أن يعمل عليها هذا الـ Middleware
export const config = {
    matcher: ['/dashboard/:path*'],
};
