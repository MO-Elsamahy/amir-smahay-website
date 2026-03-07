"use client";

import { useState, useEffect } from "react";
import { Search, Filter, FileText, CheckCircle, Clock, MoreVertical, XCircle, Loader2, X } from "lucide-react";

export default function DashboardOverview() {
    const [search, setSearch] = useState("");
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetch("/api/requests");
                const data = await res.json();
                setRequests(data);
            } catch (error) {
                console.error("Failed to load requests", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const updateRequestStatus = async (id: string, newStatus: string) => {
        try {
            setUpdatingStatus(true);
            const res = await fetch("/api/requests", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (res.ok) {
                // Update local state directly to feel fast
                setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
                setSelectedRequest((prev: any) => prev ? { ...prev, status: newStatus } : null);
            }
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
            setUpdatingStatus(false);
        }
    };

    const totalRequests = requests.length;
    const pendingRequests = requests.filter(r => r.status === 'pending').length;
    const approvedRequests = requests.filter(r => r.status === 'approved').length;
    const completionRate = totalRequests > 0 ? ((approvedRequests / totalRequests) * 100).toFixed(1) : 0;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold flex items-center gap-1 w-fit"><Clock className="w-3 h-3" /> قيد المراجعة</span>;
            case 'approved': return <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" /> تمت الموافقة</span>;
            case 'rejected': return <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold flex items-center gap-1 w-fit"><XCircle className="w-3 h-3" /> مرفوض</span>;
            default: return null;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-500">

            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold mb-2">نظرة عامة على الطلبات</h1>
                <p className="text-gray-500 text-sm">مرحباً بك في لوحة تحكم استقبال ومتابعة طلبات المواطنين.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-bold mb-1">إجمالي الطلبات</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">{totalRequests}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-bold mb-1">قيد المراجعة</p>
                        <h3 className="text-3xl font-extrabold text-yellow-600">{pendingRequests}</h3>
                    </div>
                    <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-bold mb-1">تمت الموافقة والإنجاز</p>
                        <h3 className="text-3xl font-extrabold text-green-600">{approvedRequests}</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-bold mb-1">نسبة الإنجاز</p>
                        <h3 className="text-3xl font-extrabold text-primary">{completionRate}%</h3>
                    </div>
                    <div className="w-12 h-12 bg-red-50 text-primary rounded-xl flex items-center justify-center">
                        <Filter className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Main Table Section */}
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden text-sm">
                {/* Table Toolbar */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4 items-center bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">أحدث الطلبات الواردة</h3>
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold">مباشر</span>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="ابحث بالاسم أو رقم الهاتف..."
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 font-bold shadow-sm">
                            <Filter className="w-4 h-4" />
                            تصفية
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-right pointer-events-auto">
                        <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                            <tr>
                                <th className="p-4 pr-6">رقم المرجع</th>
                                <th className="p-4">اسم المواطن</th>
                                <th className="p-4">رقم التواصل</th>
                                <th className="p-4">نوع الطلب</th>
                                <th className="p-4">التاريخ</th>
                                <th className="p-4">الحالة</th>
                                <th className="p-4">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                                        جاري جلب الطلبات...
                                    </td>
                                </tr>
                            ) : requests.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500 font-bold">
                                        لا توجد طلبات واردة حتى الآن.
                                    </td>
                                </tr>
                            ) : requests.filter(r => r.name?.includes(search) || r.phone?.includes(search)).map((req) => (
                                <tr
                                    key={req.id}
                                    className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                                    onClick={() => setSelectedRequest(req)}
                                >
                                    <td className="p-4 pr-6 font-mono text-xs text-gray-500">{req.id}</td>
                                    <td className="p-4 font-bold text-gray-900">{req.name}</td>
                                    <td className="p-4 text-gray-600" dir="ltr">{req.phone}</td>
                                    <td className="p-4 text-gray-600">
                                        {req.type === 'school' && 'طلب نقلي مدرسي'}
                                        {req.type === 'health' && 'طلب طبي'}
                                        {req.type === 'complaint' && 'شكوى عامة'}
                                        {req.type === 'other' && 'أخرى'}
                                        {req.type !== 'school' && req.type !== 'health' && req.type !== 'complaint' && req.type !== 'other' && req.type}
                                    </td>
                                    <td className="p-4 text-gray-500">{req.date}</td>
                                    <td className="p-4">{getStatusBadge(req.status)}</td>
                                    <td className="p-4">
                                        <button className="text-gray-400 hover:text-black p-1 rounded-md hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination placeholder */}
                <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <span className="text-gray-500 text-xs font-medium">عرض أحدث الطلبات ({requests.length})</span>
                </div>
            </div>

            {/* Request Details Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">

                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    تفاصيل الطلب
                                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-mono">{selectedRequest.id}</span>
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">{selectedRequest.date}</p>
                            </div>
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 flex-1 overflow-y-auto space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 mb-1">الاسم</p>
                                    <p className="font-bold text-gray-900">{selectedRequest.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 mb-1">رقم التواصل</p>
                                    <p className="font-bold text-gray-900" dir="ltr">{selectedRequest.phone}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs font-bold text-gray-400 mb-1">نوع الطلب</p>
                                    <p className="font-bold text-primary">
                                        {selectedRequest.type === 'school' && 'طلب نقلي مدرسي'}
                                        {selectedRequest.type === 'health' && 'طلب طبي'}
                                        {selectedRequest.type === 'complaint' && 'شكوى عامة'}
                                        {selectedRequest.type === 'other' && 'أخرى'}
                                        {selectedRequest.type !== 'school' && selectedRequest.type !== 'health' && selectedRequest.type !== 'complaint' && selectedRequest.type !== 'other' && selectedRequest.type}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 leading-relaxed text-gray-700">
                                <p className="text-xs font-bold text-gray-400 mb-2">تفاصيل المشكلة / الطلب</p>
                                <p>{selectedRequest.details || "لا توجد تفاصيل إضافية."}</p>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-gray-400 mb-2">الحالة الحالية</p>
                                {getStatusBadge(selectedRequest.status)}
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-wrap gap-3">
                            <button
                                onClick={() => updateRequestStatus(selectedRequest.id, 'approved')}
                                disabled={updatingStatus || selectedRequest.status === 'approved'}
                                className="flex-1 min-w-[120px] bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <CheckCircle className="w-4 h-4" />
                                الموافقة وإنجاز
                            </button>
                            <button
                                onClick={() => updateRequestStatus(selectedRequest.id, 'rejected')}
                                disabled={updatingStatus || selectedRequest.status === 'rejected'}
                                className="flex-1 min-w-[120px] bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <XCircle className="w-4 h-4" />
                                رفض
                            </button>
                            <button
                                onClick={() => updateRequestStatus(selectedRequest.id, 'pending')}
                                disabled={updatingStatus || selectedRequest.status === 'pending'}
                                className="flex-1 min-w-[120px] bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Clock className="w-4 h-4" />
                                قيد الانتظار
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
