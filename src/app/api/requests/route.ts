import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ----------------------------------------------------
// Google Sheets Configuration
// ----------------------------------------------------
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function getGoogleClient() {
    // تنسيق المفتاح السري بشكل صحيح (استبدال الـ \n ليصبح مسافة سطر حقيقية)
    const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

    return new google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: privateKey,
        scopes: SCOPES
    });
}

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function GET() {
    try {
        if (!SHEET_ID || !process.env.GOOGLE_PRIVATE_KEY) {
            // مؤقت حتى تضع الأكواد السرية، لن يتوقف الموقع ولكنه سيعيد مصفوفة فارغة
            return NextResponse.json([]);
        }

        const client = getGoogleClient();
        const sheets = google.sheets({ version: 'v4', auth: client as any });

        // نجلب البيانات من الشيت، نفترض أن الصفوف تبدأ من A2 للابتعاد عن العناوين في A1
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: 'A2:G',
        });

        const rows = response.data.values || [];

        // تحويل الصفوف إلى شكل نقدر نفهمه في لوحة التحكم وتجاهل الصفوف الفارغة بالكامل
        const requests = rows
            .filter(row => row && row.length > 0 && row[0]) // التأكد من وجود ID على الأقل
            .map((row) => ({
                id: row[0] || '',
                name: row[1] || 'بدون اسم',
                phone: row[2] || '',
                type: row[3] || 'other',
                details: row[4] || '',
                date: row[5] || '',
                status: row[6] || 'pending',
            }));

        // الترتيب من الأحدث للأقدم
        requests.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json(requests);
    } catch (error) {
        console.error('Error fetching from Google Sheets:', error);
        return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newRequest = {
            id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
            name: body.name || 'بدون اسم',
            phone: body.phone || '',
            type: body.type || 'other',
            details: body.details || '',
            date: new Date().toISOString().split('T')[0],
            status: 'pending'
        };

        if (SHEET_ID && process.env.GOOGLE_PRIVATE_KEY) {
            const client = getGoogleClient();
            const sheets = google.sheets({ version: 'v4', auth: client as any });

            // إضافة صف جديد للشيت
            await sheets.spreadsheets.values.append({
                spreadsheetId: SHEET_ID,
                range: 'A:G',
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [
                        [
                            newRequest.id,
                            newRequest.name,
                            newRequest.phone,
                            newRequest.type,
                            newRequest.details,
                            newRequest.date,
                            newRequest.status
                        ]
                    ]
                }
            });
        }

        return NextResponse.json({ success: true, request: newRequest });
    } catch (error) {
        console.error('Error appending to Google Sheets:', error);
        return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
        }

        if (!SHEET_ID || !process.env.GOOGLE_PRIVATE_KEY) {
            return NextResponse.json({ error: 'Google Sheets not configured' }, { status: 500 });
        }

        const client = getGoogleClient();
        const sheets = google.sheets({ version: 'v4', auth: client as any });

        // نجلب كل الداتا لكي نعرف رقم الصف الخاص بالطلب
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: 'A:G',
        });

        const rows = response.data.values || [];
        const rowIndex = rows.findIndex((row) => row[0] === id);

        if (rowIndex === -1) {
            return NextResponse.json({ error: 'Request not found' }, { status: 404 });
        }

        // رقم الصف الفعلي في الشيت (الصفوف تبدأ من 1)
        const exactRow = rowIndex + 1;

        // تحديث عمود الحالة فقط (العمود G)
        await sheets.spreadsheets.values.update({
            spreadsheetId: SHEET_ID,
            range: `G${exactRow}`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [status]
                ]
            }
        });

        return NextResponse.json({ success: true, id, status });
    } catch (error) {
        console.error('Error updating Google Sheets:', error);
        return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
    }
}
