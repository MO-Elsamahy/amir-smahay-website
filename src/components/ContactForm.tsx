"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Phone, MapPin, Mail, ChevronRight } from "lucide-react";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("fullName"),
            phone: formData.get("phone"),
            type: formData.get("type"),
            details: formData.get("details"),
        };

        try {
            const res = await fetch("/api/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus("success");
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission failed", error);
            setStatus("error");
        } finally {
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <section id="contact" className="py-20 md:py-32 bg-zinc-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-primary font-bold text-sm mb-6 border border-red-100"
                    >
                        تواصل معنا
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight"
                    >
                        دعنا نستمع إلى <span className="text-primary block sm:inline mt-2 sm:mt-0">صوتك</span>
                    </motion.h2>
                </div>

                <div className="max-w-6xl mx-auto rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col lg:flex-row bg-white border border-zinc-100 relative">

                    {/* Contact Information Side (Dark Theme) */}
                    <div className="lg:w-2/5 p-8 sm:p-12 lg:p-16 bg-zinc-950 text-white relative overflow-hidden flex flex-col justify-between">
                        {/* Dark Glow Background */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-900/20 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none"></div>

                        <div className="relative z-10">
                            <motion.h3
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl lg:text-4xl font-extrabold mb-6 leading-tight"
                            >
                                مكتب خدمة<br />
                                <span className="text-primary">المواطنين</span>
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-zinc-400 mb-12 text-lg font-light leading-relaxed"
                            >
                                نحن هنا للاستماع إلى مقترحاتكم وشكاواكم. فريقنا مستعد دائماً للرد ومتابعة طلبكم باهتمام شديد.
                            </motion.p>
                        </div>

                        <div className="space-y-8 relative z-10 mt-auto">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-5 group"
                            >
                                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-zinc-500 text-sm font-bold mb-1 uppercase tracking-wider">الخط الساخن</p>
                                    <p className="text-white font-medium text-lg" dir="ltr">+20 115 433 3010</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-5 group"
                            >
                                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-zinc-500 text-sm font-bold mb-1 uppercase tracking-wider">البريد الإلكتروني</p>
                                    <p className="text-white font-medium text-lg">info@samahy.tech</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center gap-5 group"
                            >
                                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-zinc-500 text-sm font-bold mb-1 uppercase tracking-wider">المقر الرئيسي</p>
                                    <p className="text-white font-medium text-lg">المحلة الكبرى، مصر</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative Dots Pattern */}
                        <div className="absolute bottom-6 left-6 grid grid-cols-3 gap-2 opacity-20 pointer-events-none">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-2 h-2 rounded-full bg-white"></div>
                            ))}
                        </div>
                    </div>

                    {/* Form Side (Light Theme) */}
                    <div className="lg:w-3/5 p-6 sm:p-10 md:p-12 lg:p-16 relative">

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label className="block text-sm font-extrabold text-zinc-800 mb-3">الاسم الرباعي <span className="text-primary">*</span></label>
                                    <input
                                        required
                                        name="fullName"
                                        type="text"
                                        className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-zinc-800 placeholder-zinc-400 font-medium"
                                        placeholder="أدخل اسمك بالكامل"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label className="block text-sm font-extrabold text-zinc-800 mb-3">رقم الهاتف / الواتساب <span className="text-primary">*</span></label>
                                    <input
                                        required
                                        name="phone"
                                        type="tel"
                                        dir="ltr"
                                        className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-zinc-800 placeholder-zinc-400 font-medium text-right"
                                        placeholder="01x xxxx xxxx"
                                    />
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <label className="block text-sm font-extrabold text-zinc-800 mb-3">نوع الطلب <span className="text-primary">*</span></label>
                                <div className="relative">
                                    <select name="type" required defaultValue="" className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-zinc-800 font-medium appearance-none cursor-pointer">
                                        <option value="" disabled>اختر نوع الطلب المناسب</option>
                                        <option value="school">طلب نقلي مدرسي / تعليمي</option>
                                        <option value="health">طلب طبي / صحي</option>
                                        <option value="complaint">شكوى عامة</option>
                                        <option value="other">أخرى</option>
                                    </select>
                                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                        <ChevronRight className="w-5 h-5 text-zinc-400 rotate-90" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <label className="block text-sm font-extrabold text-zinc-800 mb-3">تفاصيل الطلب <span className="text-primary">*</span></label>
                                <textarea
                                    required
                                    name="details"
                                    rows={5}
                                    className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-zinc-800 placeholder-zinc-400 font-medium resize-none"
                                    placeholder="اكتب تفاصيل طلبك أو شكواك بوضوح هنا..."
                                ></textarea>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={status === "loading"}
                                type="submit"
                                className="w-full bg-gradient-to-l from-primary to-rose-600 hover:to-primary text-white font-extrabold py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 group disabled:opacity-70 text-lg relative overflow-hidden"
                            >
                                {/* Button shine effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                                {status === "loading" ? (
                                    <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span>
                                ) : (
                                    <>
                                        إرسال الطلب بشكل آمن
                                        <Send className="w-5 h-5 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>

                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-5 bg-green-50 text-green-800 rounded-2xl font-bold border border-green-200 text-center flex items-center justify-center gap-3 shadow-sm"
                                >
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                        ✓
                                    </div>
                                    تم استلام طلبك بنجاح! سيتم التواصل معك قريباً.
                                </motion.div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
