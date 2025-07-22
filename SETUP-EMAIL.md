# 📧 Configuración del Sistema de Email

Para que el formulario de contacto funcione correctamente, necesitas configurar las variables de entorno para el envío de emails.

## 🛠️ Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Configuración SMTP (Ejemplo con Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password

# Emails
SMTP_FROM=tu-email@gmail.com
CONTACT_EMAIL=donde-quieres-recibir-emails@gmail.com
```

## 📋 Configuración para Gmail

### Paso 1: Habilitar Verificación en 2 Pasos
1. Ve a tu [Cuenta de Google](https://myaccount.google.com/)
2. Haz clic en "Seguridad"
3. Habilita "Verificación en 2 pasos"

### Paso 2: Crear Contraseña de Aplicación
1. En la misma sección de "Seguridad"
2. Busca "Contraseñas de aplicaciones"
3. Selecciona "Correo" y tu dispositivo
4. Google te dará una contraseña de 16 caracteres
5. **Usa esta contraseña en `SMTP_PASS`, NO tu contraseña normal**

### Paso 3: Configurar Variables
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=abcd efgh ijkl mnop  # La contraseña de aplicación de 16 caracteres
SMTP_FROM=tu-email@gmail.com
CONTACT_EMAIL=tu-email@gmail.com  # O cualquier otro email donde quieras recibir los mensajes
```

## 🔧 Configuración para Otros Proveedores

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
```

## ✅ Probar la Configuración

1. Inicia el servidor de desarrollo: `npm run dev`
2. Ve a la sección del formulario en tu sitio
3. Completa y envía el formulario
4. Revisa tu email para confirmar que llegó el mensaje

## 🔒 Seguridad

- **NUNCA** subas tu archivo `.env.local` a GitHub
- El archivo `.env.local` ya está en `.gitignore`
- Usa contraseñas de aplicación, no contraseñas principales
- Las variables de entorno son seguras y solo están disponibles en el servidor

## 🐛 Solución de Problemas

### Error: "Invalid login"
- Verifica que estés usando una contraseña de aplicación, no tu contraseña normal
- Confirma que la verificación en 2 pasos esté habilitada

### Error: "Connection timeout"
- Verifica tu conexión a internet
- Algunos ISPs bloquean el puerto 587, prueba con 465 y `SMTP_SECURE=true`

### Error: "Authentication failed"
- Revisa que tu email y contraseña de aplicación sean correctos
- Asegúrate de que no haya espacios extra en las variables

## 📨 Ejemplo de Email que se Enviará

Cuando alguien complete el formulario, recibirás un email como este:

**Asunto:** Nuevo contacto desde DNXTLAB - [Nombre] [Apellido]

**Contenido:**
- Información del cliente (nombre, apellido, email)
- El mensaje completo
- Formato HTML profesional
- Footer identificando que vino del formulario de DNXTLAB

¡Tu formulario de contacto ya está listo! 🚀 