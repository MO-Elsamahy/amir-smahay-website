"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "الرئيسية", href: "#" },
        { name: "عن أمير السماحي", href: "#about" },
        { name: "الخبرات والمؤهلات", href: "#experience" },
        { name: "الإنجازات", href: "#achievements" },
        { name: "تواصل معنا", href: "#contact" },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled
                ? "bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-gray-100 py-3"
                : "bg-gradient-to-b from-black/60 to-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex justify-between items-center">

                    {/* Logo Section */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-full shadow-lg border-2 border-white/80 transition-transform duration-300 group-hover:scale-105 bg-white flex items-center justify-center p-1">
                            <Image
                                src="/eladl_logo.png"
                                alt="شعار حزب العدل"
                                layout="fill"
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-extrabold text-2xl tracking-tight transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                                أمير <span className="text-primary">السماحي</span>
                            </span>
                            <span className={`text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${scrolled ? 'text-gray-500' : 'text-gray-300'}`}>
                                حزب العدل | صوت المواطن
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        <nav className="flex gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`relative text-sm font-bold transition-all duration-300 group ${scrolled ? "text-gray-700 hover:text-primary" : "text-gray-200 hover:text-white"
                                        }`}
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                        </nav>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/dashboard/login"
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-xl backdrop-blur-md border ${scrolled
                                ? "bg-black text-white hover:bg-gray-800 border-transparent hover:shadow-primary/20"
                                : "bg-white/10 text-white hover:bg-white hover:text-primary border-white/20 hover:shadow-white/30"
                                }`}
                        >
                            بوابة الإدارة
                        </motion.a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/20"
                            }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full md:hidden bg-white/95 backdrop-blur-2xl border-b border-gray-100 shadow-2xl overflow-hidden origin-top"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-6">
                            {navLinks.map((link, idx) => (
                                <motion.a
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-800 font-bold text-lg py-3 border-b border-gray-100 hover:text-primary transition-colors flex items-center justify-between group"
                                >
                                    {link.name}
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-xl">←</span>
                                </motion.a>
                            ))}
                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                href="/dashboard/login"
                                className="bg-gradient-to-r from-primary to-gray-900 text-white text-center px-6 py-4 rounded-2xl text-lg font-bold hover:shadow-lg hover:shadow-primary/30 transition-all w-full mt-4 flex justify-center items-center gap-2"
                            >
                                بوابة الإدارة
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
