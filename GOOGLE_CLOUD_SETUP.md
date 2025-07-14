# Configuración Google Cloud - Paso a Paso

## Paso 1: Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Si es tu primera vez, acepta los términos de servicio
3. Haz clic en "Select a project" (arriba a la izquierda)
4. Haz clic en "New Project"
5. Nombre del proyecto: **global-bids-sheets**
6. Haz clic en "Create"

## Paso 2: Habilitar Google Sheets API

1. Una vez creado el proyecto, asegúrate de estar en él
2. Ve al menú ≡ (hamburguesa) → **APIs & Services** → **Library**
3. En la barra de búsqueda, escribe: **Google Sheets API**
4. Haz clic en "Google Sheets API" en los resultados
5. Haz clic en el botón azul **"Enable"**

## Paso 3: Crear Service Account

1. Ve al menú ≡ → **APIs & Services** → **Credentials**
2. Haz clic en **"+ Create Credentials"** (arriba)
3. Selecciona **"Service Account"**
4. Completa:
   - **Service account name**: global-bids-registration
   - **Service account ID**: global-bids-registration (se genera automáticamente)
   - **Description**: Service account para registros de Global Bids
5. Haz clic en **"Create and Continue"**
6. **Rol**: Selecciona "Basic" → "Editor" (opcional pero recomendado)
7. Haz clic en **"Continue"**
8. **Grant users access**: Déjalo vacío
9. Haz clic en **"Done"**

## Paso 4: Generar Clave JSON

1. En la página de **Credentials**, verás tu service account listado
2. Haz clic en el **email del service account** (algo como global-bids-registration@tu-proyecto.iam.gserviceaccount.com)
3. Ve a la pestaña **"Keys"**
4. Haz clic en **"Add Key"** → **"Create New Key"**
5. Selecciona **"JSON"**
6. Haz clic en **"Create"**
7. **Se descargará un archivo JSON** - guárdalo en un lugar seguro

## Paso 5: Extraer Información del JSON

Abre el archivo JSON descargado. Verás algo así:

```json
{
  "type": "service_account",
  "project_id": "global-bids-sheets-123456",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "global-bids-registration@global-bids-sheets-123456.iam.gserviceaccount.com",
  "client_id": "123456789...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/global-bids-registration%40global-bids-sheets-123456.iam.gserviceaccount.com"
}
```

## Paso 6: Datos que Necesito

Del archivo JSON, necesito que me proporciones:

1. **GOOGLE_SERVICE_ACCOUNT_EMAIL**: El valor de `"client_email"`
2. **GOOGLE_PRIVATE_KEY**: El valor completo de `"private_key"` (incluyendo -----BEGIN PRIVATE KEY----- y -----END PRIVATE KEY-----)

## Paso 7: Compartir Google Sheet con Service Account

1. Ve a tu Google Sheet: https://docs.google.com/spreadsheets/d/1zErj_X7P9J-U0Ed8607zgTuBpfuqwwScQtH24aTLKqA/edit
2. Haz clic en **"Share"** (botón azul, arriba a la derecha)
3. En "Add people and groups", pega el **client_email** del JSON
4. Cambia los permisos a **"Editor"**
5. **DESACTIVA** "Notify people" (no es necesario enviar notificación)
6. Haz clic en **"Share"**

## Ejemplo de lo que me envías:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=global-bids-registration@global-bids-sheets-123456.iam.gserviceaccount.com

GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...
[todo el contenido de la clave privada]
...
-----END PRIVATE KEY-----
```

## ¿Necesitas Ayuda?

Si tienes alguna duda en algún paso, me dices en cuál te quedaste y te ayudo específicamente con esa parte.

Una vez que tengas los datos, me los pasas y configuro todo automáticamente.