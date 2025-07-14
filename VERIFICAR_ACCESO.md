# ¡IMPORTANTE! Verificar Acceso a Google Sheet

## Paso Crítico que DEBES Hacer

Tu Google Sheet necesita ser compartida con el service account para que el sistema pueda escribir en ella.

### ¿Cómo verificar y arreglar?

1. **Ve a tu Google Sheet**: https://docs.google.com/spreadsheets/d/1zErj_X7P9J-U0Ed8607zgTuBpfuqwwScQtH24aTLKqA/edit

2. **Haz clic en "Compartir"** (botón azul arriba a la derecha)

3. **Agrega este email**: `global-bids-registration@bg-registros.iam.gserviceaccount.com`

4. **Asigna permisos de "Editor"**

5. **DESACTIVA "Notify people"** (no envíes notificación)

6. **Haz clic en "Compartir"**

### ¿Cómo saber si funcionó?

Después de compartir la hoja, cuando alguien se registre en tu web deberías ver:
- ✅ Se guarda en la base de datos
- ✅ Se envía el email
- ✅ Se agrega automáticamente a tu Google Sheet

### ¿Qué verás en la hoja?

La hoja tendrá estas columnas:
| ID | Fecha de Registro | Nombre | Apellido | Email | Teléfono | Tipos de Maquinaria Interesado |
|----|------------------|---------|----------|--------|----------|--------------------------------|
| 5  | 14/07/2025       | Ana     | Martínez | ana@ejemplo.com | +56955667788 | excavator, crane, parts |

¡Este paso es CRUCIAL para que funcione!