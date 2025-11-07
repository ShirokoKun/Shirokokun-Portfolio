import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const sheetsScopes = ['https://www.googleapis.com/auth/spreadsheets'];

const getSheetsClient = async () => {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Google service account credentials are not configured.');
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: sheetsScopes,
  });

  await auth.authorize();
  return google.sheets({ version: 'v4', auth });
};

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    const targetRange = process.env.GOOGLE_SHEETS_RANGE || 'Responses!A:E';

    if (!spreadsheetId) {
      throw new Error('Google Sheets ID is not configured.');
    }

    const sheets = await getSheetsClient();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: targetRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          name,
          email,
          subject,
          message,
        ]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}


