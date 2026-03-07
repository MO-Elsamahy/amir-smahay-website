"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Handshake, School, CheckCircle, FileText } from "lucide-react";

const Counter = ({ end, duration }: { end: number; duration: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return <span>+{count.toLocaleString("ar-EG")}</span>;
};

export default function Achievements() {
    const stats = [
        {
            id: 1,
            icon: <School className="w-10 h-10" />,
            title: "طلبات مدارس منجزة",
            value: 5000,
            desc: "تم حلها بنجاح وخدمة الطلبة",
        },
        {
            id: 2,
            icon: <Handshake className="w-10 h-10" />,
            title: "طلبات صحة وعلاج",
            value: 2000,
            desc: "تواصل وتدخل سريع لخدمة المرضى والأهالي",
        },
        {
            id: 3,
            icon: <FileText className="w-10 h-10" />,
            title: "شكاوى عامة وخدمية",
            value: 1500,
            desc: "تم متابعتها وحلها في كافة القطاعات",
        },
        {
            id: 4,
            icon: <CheckCircle className="w-10 h-10" />,
            title: "مشاريع دعم مجتمعي",
            value: 25,
            desc: "مبادرات شبابية وخيرية مستدامة",
        },
    ];

    return (
        <section id="achievements" className="py-20 md:py-32 bg-zinc-950 text-white relative overflow-hidden border-t border-white/5">
            {/* Dynamic Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/2 w-full h-[500px] bg-primary rounded-[100%] opacity-[0.03] blur-[120px]"></div>
                <div className="absolute bottom-0 left-1/2 w-full h-[500px] bg-red-900 rounded-[100%] opacity-[0.05] blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary font-bold text-sm mb-6"
                    >
                        بالأرقام
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
                    >
                        إنجازات تتحدث عن <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400 block sm:inline mt-2 sm:mt-0">نفسها</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl font-light text-zinc-400 mt-6 max-w-2xl mx-auto"
                    >
                        خلاصة العمل الدؤوب والمستمر من 2015 حتى 2025 لخدمة أبناء المحلة الكبرى ومواجهة التحديات.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="relative group"
                        >
                            {/* Card wrapper for gradient border effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]"></div>

                            <div className="relative h-full bg-zinc-900/50 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-[2.5rem] border border-white/10 text-center hover:bg-zinc-900/80 transition-all duration-500 overflow-hidden">
                                {/* Internal Glow */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors duration-500"></div>

                                <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center mb-8 text-primary shadow-[0_0_40px_rgba(240,6,9,0.15)] group-hover:shadow-[0_0_60px_rgba(240,6,9,0.3)] group-hover:scale-110 transition-all duration-500">
                                    {stat.icon}
                                </div>

                                <h3 className="text-4xl sm:text-5xl font-black mb-4 tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                                    <Counter end={stat.value} duration={2500} />
                                </h3>

                                <p className="text-xl font-bold text-zinc-200 mb-2">{stat.title}</p>
                                <p className="text-sm text-zinc-500 font-medium leading-relaxed">{stat.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
