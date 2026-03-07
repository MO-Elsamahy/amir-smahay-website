"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, PlayCircle } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-zinc-950 pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-[95vh] flex items-center">

            {/* Animated Glow Elements Background */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.4, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-1/4 -mt-32 w-[600px] h-[600px] bg-primary rounded-full mix-blend-screen filter blur-[120px] opacity-30 pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 left-1/4 -mb-32 w-[500px] h-[500px] bg-red-800 rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none"
            />

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-right text-white"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="inline-flex items-center gap-3 py-2 px-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 group cursor-default shadow-[0_0_15px_rgba(240,6,9,0.2)]"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">صوتك يصنع الفارق</span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-extrabold text-white leading-[1.2] mb-6 tracking-tight">
                            أمير <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-rose-400 drop-shadow-[0_0_15px_rgba(240,6,9,0.3)]">السماحي</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-light max-w-xl border-r-4 border-primary pr-6">
                            نعمل من أجل غدٍ أفضل، نؤمن بالشفافية والعمل الجاد لخدمة أبناء مدينة المحلة الكبرى.
                            رؤية واضحة، وإرادة قوية لتحقيق طموحاتكم.
                        </p>

                        <div className="flex flex-col sm:flex-row sm:flex-row-reverse gap-4 justify-start">
                            <motion.a
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(240,6,9,0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                href="#contact"
                                className="w-full sm:w-auto bg-gradient-to-l from-primary to-primary-dark text-white px-8 py-4 rounded-full font-bold shadow-xl transition-all flex items-center justify-center gap-3 group"
                            >
                                تواصل معنا
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#about"
                                className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-full font-bold transition-all hover:bg-white/10 flex items-center justify-center gap-3 group"
                            >
                                <PlayCircle className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                                اعرف المزيد
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Visual Profile Photo with Premium Glassmorphism Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 50 }}
                        className="relative lg:ml-auto w-full max-w-lg mx-auto lg:mx-0"
                    >
                        {/* Outline Card Styling */}
                        <div className="relative aspect-[3/4] sm:aspect-square md:aspect-[4/5] w-full rounded-[2.5rem] p-3 bg-gradient-to-tr from-white/15 to-white/5 backdrop-blur-3xl border border-white/20 shadow-[0_30px_60px_-15px_rgba(240,6,9,0.4)] transform-gpu hover:-translate-y-2 transition-transform duration-500 overflow-hidden group">

                            {/* Actual Image container */}
                            <div className="absolute inset-3 rounded-[2rem] bg-zinc-900 overflow-hidden shadow-inner">
                                <Image
                                    src="/personal_photo.jpg"
                                    alt="أمير السماحي"
                                    layout="fill"
                                    className="object-cover object-top filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"></div>

                                {/* Overlay Text inside Image */}
                                <div className="absolute bottom-6 left-6 right-6 z-20 text-center">
                                    <p className="text-white text-sm font-medium tracking-wide border-t border-white/20 pt-3">
                                        عضو حزب العدل
                                    </p>
                                </div>
                            </div>

                            {/* Decorative Corner Accents */}
                            <div className="absolute -top-2 -right-2 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-2xl opacity-60"></div>
                            <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-2xl opacity-60"></div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Bottom fade transition into the next component (About sect) */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
        </section>
    );
}
