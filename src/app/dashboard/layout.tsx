import { Metadata } from "next";

export const metadata: Metadata = {
    title: "بوابة الإدارة | أمير السماحي",
    description: "لوحة تحكم خاصة لإدارة الطلبات",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900" dir="rtl">
            {/* Dashboard Topbar */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">
                            أ.س
                        </div>
                        <span className="font-bold text-lg">بوابة المتابعة</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-500 hidden md:block">
                            مدير النظام
                        </span>
                        <a
                            href="/"
                            className="text-sm text-gray-500 hover:text-primary transition-colors hover:underline"
                        >
                            العودة للموقع
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
                <main className="flex-1 p-4 md:p-8 w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
