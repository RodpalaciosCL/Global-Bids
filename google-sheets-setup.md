# Google Sheets Integration Setup Guide

**IMPORTANTE**: La Google Sheet será tuya y estará en tu cuenta. Solo me das acceso a través de credenciales para que el sistema pueda escribir automáticamente los registros.

## Paso 1: Crear Google Cloud Project

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la Google Sheets API:
   - Ve a "APIs & Services" > "Library"
   - Busca "Google Sheets API"
   - Haz clic en "Enable"

## Paso 2: Crear Service Account

1. Ve a "APIs & Services" > "Credentials"
2. Haz clic en "Create Credentials" > "Service Account"
3. Completa los detalles:
   - Service account name: `global-bids-sheets`
   - Service account ID: `global-bids-sheets`
   - Description: `Service account for Global Bids registration data`
4. Haz clic en "Create and Continue"
5. Asigna el rol "Editor" (opcional, pero recomendado)
6. Haz clic en "Done"

## Paso 3: Generar Credentials JSON

1. En la lista de service accounts, haz clic en el que acabas de crear
2. Ve a la pestaña "Keys"
3. Haz clic en "Add Key" > "Create New Key"
4. Selecciona "JSON" y haz clic en "Create"
5. Se descargará un archivo JSON con las credenciales

## Paso 4: Crear Google Sheet EN TU CUENTA

1. Ve a [Google Sheets](https://sheets.google.com/) **en tu cuenta personal/empresa**
2. Crea una nueva hoja de cálculo
3. Nómbrala "Global Bids - Registros de Participantes"
4. Copia el ID de la hoja desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```
5. **CRUCIAL**: Comparte la hoja con el email del service account:
   - Haz clic en "Share" en la esquina superior derecha
   - Pega el email del service account (encontrado en el JSON descargado)
   - Asigna permisos de "Editor"
   - Haz clic en "Send"

**La sheet será tuya, solo el service account puede escribir en ella automáticamente**

## Paso 5: Configurar Variables de Entorno

Del archivo JSON descargado, necesitas extraer estos valores:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "global-bids-sheets@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

## Variables de Entorno Requeridas

Agrega estas variables a tu archivo `.env`:

```env
# Google Sheets Integration
GOOGLE_SHEET_ID=your-sheet-id-here
GOOGLE_SERVICE_ACCOUNT_EMAIL=global-bids-sheets@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR-PRIVATE-KEY-HERE\n-----END PRIVATE KEY-----\n"
```

## Ejemplo de Configuración

```env
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
GOOGLE_SERVICE_ACCOUNT_EMAIL=global-bids-sheets@global-bids-12345.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

## Verificación

Una vez configurado, el sistema automáticamente:

1. ✅ Guardará cada registro en la base de datos
2. ✅ Enviará un email a contacto@theglobalbid.com
3. ✅ Agregará los datos a Google Sheets con estas columnas:
   - ID
   - Fecha de Registro
   - Nombre
   - Apellido
   - Email
   - Teléfono
   - Tipos de Maquinaria Interesado

## Compartir con tu Socio

Para que tu socio pueda acceder a la hoja **EN TU CUENTA**:

1. Abre la Google Sheet (que está en tu cuenta)
2. Haz clic en "Share"
3. Agrega el email de tu socio
4. Asigna permisos de "Viewer" o "Editor" según lo que necesites
5. Haz clic en "Send"

**Tu socio verá la sheet en tiempo real, pero la sheet seguirá siendo tuya**

## Troubleshooting

- **Error 403**: Asegúrate de que la hoja esté compartida con el service account
- **Error de autenticación**: Verifica que las variables de entorno estén correctamente configuradas
- **Private key error**: Asegúrate de que la private key tenga los saltos de línea correctos (`\n`)

## Datos de Ejemplo

La hoja se verá así:

| ID | Fecha de Registro | Nombre | Apellido | Email | Teléfono | Tipos de Maquinaria Interesado |
|----|------------------|---------|----------|--------|----------|--------------------------------|
| 1  | 14/07/2025       | Juan    | Pérez    | juan@ejemplo.com | +56912345678 | Excavadoras, Cargadores |
| 2  | 14/07/2025       | María   | González | maria@ejemplo.com | +56987654321 | Camiones, Grúas |