"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, LogIn } from "lucide-react";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                // تصفح للوحة التحكم عند النجاح، التوجيه يتم عبر السيرفر بأمان
                window.location.href = "/dashboard";
            } else {
                setError(true);
                setLoading(false);
            }
        } catch (error) {
            console.error("Login failed", error);
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md border border-gray-100"
            >
                <div className="w-16 h-16 bg-red-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-8 h-8" />
                </div>

                <h1 className="text-2xl font-bold text-center mb-2">تسجيل الدخول</h1>
                <p className="text-gray-500 text-center mb-8 text-sm">
                    يرجى إدخال كلمة المرور للوصول إلى لوحة تحكم الطلبات
                </p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            كلمة المرور
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${error ? "border-red-300 bg-red-50" : "border-gray-200"
                                }`}
                            placeholder="••••••••"
                            dir="ltr"
                        />
                        {error && (
                            <p className="text-red-500 text-xs font-bold mt-2 text-right">
                                كلمة المرور غير صحيحة، حاول مجدداً
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !password}
                        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                        ) : (
                            <>
                                دخول
                                <LogIn className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
