import { Shield } from "lucide-react";
import Image from "next/image";

// الدالة المسؤولة عن جلب الرابط من الجيست
async function getDeveloperData() {
    try {
        // ضع الرابط المباشر (Raw URL) للجيست الخاص بك بصيغة JSON هنا
        const gistRawUrl = "https://gist.githubusercontent.com/MO-Elsamahy/635085ad6b6be9a65a5a64a05e6bee74/raw";

        // جلب البيانات وتحديثها كل ساعة (3600 ثانية)
        const res = await fetch(gistRawUrl, { next: { revalidate: 3600 } });
        if (res.ok) {
            const data = await res.json();
            return {
                url: data.url || "#",
                name: data.name || "MZ for Tech solutions"
            };
        }
    } catch (error) {
        console.error("Failed to fetch developer data from Gist", error);
    }
    return { url: "#", name: "MZ for Tech solutions" }; // البيانات الافتراضية
}

export default async function Footer() {
    const devData = await getDeveloperData();

    return (
        <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-900 border-opacity-50">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-12 mb-12">

                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <Shield className="w-8 h-8 text-primary" />
                            <span className="font-extrabold text-2xl tracking-tight">
                                أمير <span className="text-primary">السماحي</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            شخصية سياسية من أبناء المحلة الكبرى، يمثل حزب العدل ويسعى لتحقيق طموحات المواطنين والنهوض بالمجتمع من خلال العمل الجاد والشفافية.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold mb-6 text-white">روابط سريعة</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">الرئيسية</a></li>
                            <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors text-sm">عن أمير السماحي</a></li>
                            <li><a href="#achievements" className="text-gray-400 hover:text-primary transition-colors text-sm">الإنجازات الاستثنائية</a></li>
                            <li><a href="#contact" className="text-gray-400 hover:text-primary transition-colors text-sm">تقديم طلب / شكوى</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold mb-6 text-white">بوابة الإدارة</h4>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            هذه البوابة مخصصة حصرياً لفريق العمل لمتابعة طلبات المواطنين.
                        </p>
                        <a
                            href="/dashboard/login"
                            className="inline-block bg-primary hover:bg-primary-dark text-white text-sm font-bold py-3 px-6 rounded-xl transition-colors"
                        >
                            دخول لوحة التحكم
                        </a>
                    </div>

                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm text-center md:text-right">
                        جميع الحقوق محفوظة &copy; {new Date().getFullYear()} أمير السماحي - حزب العدل.
                    </p>

                    {/* Developer Branding */}
                    <a
                        href={devData.url !== "#" ? devData.url : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-gray-900/50 px-5 py-2.5 rounded-full border border-gray-800 hover:border-gray-600 transition-colors group cursor-pointer"
                    >
                        <span className="text-gray-400 text-xs font-medium group-hover:text-gray-300 transition-colors">تم التصميم والتطوير بواسطة</span>
                        <div className="relative w-7 h-7 bg-white rounded-md p-1 opacity-90 group-hover:opacity-100 transition-opacity">
                            <Image
                                src="/MZ.png"
                                alt="MZ Company Logo"
                                layout="fill"
                                className="object-contain p-0.5"
                            />
                        </div>
                        <span className="text-white font-bold text-sm tracking-wider group-hover:text-primary transition-colors">{devData.name}</span>
                    </a>

                    <div className="flex gap-4">
                        {/* Social Links Placeholders */}
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">FB</a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">TW</a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">IG</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
