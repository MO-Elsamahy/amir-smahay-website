"use client";

import { motion } from "framer-motion";
import { Briefcase, Award, GraduationCap, ChevronRight } from "lucide-react";

export default function Experience() {
    const experiences = [
        {
            period: "2025 - حتى الآن",
            role: "أمين العمل الجماهيري بمحافظة الغربية",
            entity: "حزب العدل",
        },
        {
            period: "2023 - 2024",
            role: "عضو هيئة مكتب العلاقات الحكومية بمحافظة الغربية",
            entity: "غير محدد / مستقبل وطن",
        },
        {
            period: "2022 - 2023",
            role: "أمين العلاقات الحكومية ومسئول الوحدات الحزبية",
            entity: "حزب مستقبل وطن",
        },
        {
            period: "2021 - 2022",
            role: "أمين المحليات",
            entity: "حزب مستقبل وطن",
        },
        {
            period: "2020 - 2021",
            role: "أمين مساعد العمل الجماهيري",
            entity: "حزب مستقبل وطن",
        },
        {
            period: "2015 - الوقت الحالي",
            role: "عضو مجلس ادارة / أمين الصندوق",
            entity: "جمعية الإمام للتنمية والثقافة",
        },
        {
            period: "2015 - 2019",
            role: "عضو",
            entity: "مجلس القيادات الشابة بالغربية",
        },
        {
            period: "2016 - 2018",
            role: "عضو",
            entity: "المحلة تقدر",
        }
    ];

    const certificates = [
        {
            year: "2022",
            title: "دورة استراتيجيات الأمن القومي",
            issuer: "أكاديمية ناصر العسكرية",
        },
        {
            year: "2022",
            title: "دورة الأزمات والتفاوض",
            issuer: "جهة معتمدة",
        },
        {
            year: "2018",
            title: "دورة المحليات",
            issuer: "وزارة الشباب والرياضة",
        },
        {
            year: "2017",
            title: "دورة المحليات",
            issuer: "وزارة الشباب والرياضة",
        },
        {
            year: "2016",
            title: "دورة المحليات",
            issuer: "وزارة الشباب والرياضة",
        },
        {
            year: "1994",
            title: "حاصل على دبلوم تجارة",
            issuer: "وزارة التربية والتعليم",
        }
    ];

    return (
        <section id="experience" className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-primary font-bold text-sm mb-6 border border-red-100"
                    >
                        مسيرة حافلة
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight"
                    >
                        الخبرات والمؤهلات <span className="text-primary">العلمية</span>
                    </motion.h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 relative">
                    {/* Divider for Desktop */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 -translate-x-1/2"></div>

                    {/* Experiences Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-10"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-lg">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-zinc-900">الخبرات السياسية والمجتمعية</h3>
                        </motion.div>

                        <div className="space-y-6 relative before:absolute before:top-0 before:bottom-0 before:right-[19px] before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-300 before:to-transparent">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative flex items-center pr-12 lg:pr-14 group"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute right-0 flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-zinc-200 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow z-10">
                                        <span className="w-3 h-3 rounded-full bg-white"></span>
                                    </div>

                                    {/* Content Card */}
                                    <div className="w-full p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-100 shadow-sm group-hover:shadow-md transition-shadow group-hover:border-zinc-200 group-hover:bg-white">
                                        <div className="flex items-center gap-2 text-primary font-bold text-sm mb-3">
                                            <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-100 flex items-center gap-2 shadow-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                                {exp.period}
                                            </span>
                                        </div>
                                        <h4 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2 leading-snug">{exp.role}</h4>
                                        <p className="text-zinc-500 font-medium flex items-center gap-1.5 text-sm sm:text-base">
                                            <ChevronRight className="w-4 h-4 text-primary rtl:rotate-180 shrink-0" />
                                            {exp.entity}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certificates Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-10"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-zinc-900">الشهادات والدورات</h3>
                        </motion.div>

                        <div className="space-y-6">
                            {certificates.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-5 p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-zinc-200 hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-primary group-hover:border-primary/30 transition-colors shrink-0">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-zinc-900 mb-2 leading-snug">{cert.title}</h4>
                                        <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
                                            <span className="flex items-center gap-1 bg-zinc-200/50 px-2 py-0.5 rounded text-zinc-700">
                                                {cert.year}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                {cert.issuer}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
