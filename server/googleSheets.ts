import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { InsertRegistration } from '@shared/schema';

// Your Google Sheet ID from the URL
const GOOGLE_SHEET_ID = '1zErj_X7P9J-U0Ed8607zgTuBpfuqwwScQtH24aTLKqA';

// Initialize Google Sheets authentication
const getAuth = () => {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.log('⚠️  Google Sheets credentials not configured');
    return null;
  }

  return new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
};

// Add registration data to Google Sheets
export async function addRegistrationToSheets(registration: InsertRegistration & { id: number; createdAt: string }) {
  try {
    const auth = getAuth();
    if (!auth) {
      console.log('⚠️  Skipping Google Sheets - credentials not configured');
      return;
    }

    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, auth);
    await doc.loadInfo();
    
    // Get the first sheet or create one if it doesn't exist
    let sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      sheet = await doc.addSheet({ title: 'Registros de Participantes' });
    }

    // Check if headers exist, if not add them
    const rows = await sheet.getRows();
    if (rows.length === 0) {
      await sheet.setHeaderRow([
        'ID',
        'Fecha de Registro',
        'Nombre',
        'Apellido',
        'Email',
        'Teléfono',
        'Tipos de Maquinaria Interesado'
      ]);
    }

    // Format the interested types for display
    const interestedTypes = Array.isArray(registration.interestedIn) 
      ? registration.interestedIn.join(', ')
      : registration.interestedIn;

    // Add the registration data
    await sheet.addRow({
      'ID': registration.id,
      'Fecha de Registro': new Date(registration.createdAt).toLocaleDateString('es-CL'),
      'Nombre': registration.firstName,
      'Apellido': registration.lastName,
      'Email': registration.email,
      'Teléfono': registration.phone,
      'Tipos de Maquinaria Interesado': interestedTypes
    });

    console.log(`✅ Registration added to Google Sheets: ${registration.firstName} ${registration.lastName}`);
  } catch (error) {
    console.error('❌ Error adding registration to Google Sheets:', error);
  }
}

// Get all registrations from Google Sheets (optional helper function)
export async function getRegistrationsFromSheets() {
  try {
    const auth = getAuth();
    if (!auth) return [];

    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId) return [];

    const doc = new GoogleSpreadsheet(sheetId, auth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    if (!sheet) return [];

    const rows = await sheet.getRows();
    return rows.map(row => ({
      id: row.get('ID'),
      createdAt: row.get('Fecha de Registro'),
      firstName: row.get('Nombre'),
      lastName: row.get('Apellido'),
      email: row.get('Email'),
      phone: row.get('Teléfono'),
      interestedIn: row.get('Tipos de Maquinaria Interesado')
    }));
  } catch (error) {
    console.error('❌ Error fetching registrations from Google Sheets:', error);
    return [];
  }
}