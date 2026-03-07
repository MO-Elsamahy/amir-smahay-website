import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        // كلمة المرور للدخول. يفضل مستقبلاً وضعها في ملف .env
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

        if (password === ADMIN_PASSWORD) {
            // إنشاء استجابة ناجحة
            const response = NextResponse.json({ success: true });

            // تعيين ملف ارتباط (Cookie) مشفر وآمن
            response.cookies.set({
                name: 'auth_session',
                value: 'authenticated',
                httpOnly: true, // يمنع الوصول لها عن طريق جافا سكريبت من المتصفح (حماية من XSS)
                secure: process.env.NODE_ENV === 'production', // يستخدم HTTPS في الإنتاج
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // صالحة لمدة أسبوع
            });

            return response;
        }

        return NextResponse.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'حدث خطأ في السيرفر' }, { status: 500 });
    }
}
