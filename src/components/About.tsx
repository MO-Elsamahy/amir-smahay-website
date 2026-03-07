"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, Target, TrendingUp } from "lucide-react";

export default function About() {
    const features = [
        {
            icon: <Users className="w-8 h-8 text-white" />,
            title: "قريب من الناس",
            description: "نستمع لمشاكلكم ونعمل على حلها بفضل تواصلنا المباشر واليومي في كافة دوائرنا.",
        },
        {
            icon: <Target className="w-8 h-8 text-white" />,
            title: "رؤية واضحة",
            description: "نمتلك أهدافاً طموحة لرفع مستوى الخدمات العامة وتحسين جودة الحياة للمواطن.",
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-white" />,
            title: "شفافية وعدالة",
            description: "نعمل بمبادئ حزب العدل، نضع النزاهة والشفافية في مقدمة أولوياتنا دائماً.",
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-white" />,
            title: "إنجازات ملموسة",
            description: "نتماشى مع متطلبات العصر لتحقيق نهضة حقيقية بالأرقام في جميع القطاعات.",
        },
    ];

    return (
        <section id="about" className="py-20 md:py-32 bg-zinc-50 relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-primary font-bold text-sm mb-6 border border-red-100"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        من نحن
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 mb-6 leading-tight"
                    >
                        أمير السماحي.. خبرة طويلة <span className="text-primary block sm:inline mt-2 sm:mt-0">وقريب من المواطن</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-zinc-600 text-lg md:text-xl leading-relaxed font-light"
                    >
                        شخصية سياسية من أبناء مدينة المحلة الكبرى، يعمل منذ سنوات طويلة في الشارع ليكون قريباً من الناس.
                        يسعى دائماً للاستماع إلى مشاكل المواطنين وحلها قدر المستطاع في كافة القطاعات الخدمية والصحية والتعليمية.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white p-6 md:p-10 rounded-[2rem] border border-zinc-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-20px_rgba(240,6,9,0.15)] hover:border-red-100 transition-all duration-500 group relative overflow-hidden"
                        >
                            {/* Card Hover Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors duration-500"></div>

                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-zinc-900 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                            <p className="text-zinc-500 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
