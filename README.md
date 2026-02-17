# SendMail Nodemailer API

Servicio backend en Node.js/Express para enviar correos desde formularios de contacto usando Nodemailer + OAuth2 de Gmail.

## Descripción
Este proyecto expone endpoints HTTP para recibir datos de un formulario y enviarlos por correo electrónico.

Flujo general:
1. El cliente envía `name`, `email`, `subject` y `message` por `POST`.
2. El controlador crea un transporter de Nodemailer con OAuth2.
3. Se envía el correo al destinatario configurado en variables de entorno.

## Tecnologías
- Node.js (ES Modules)
- Express 5
- Nodemailer
- Google OAuth2 (`googleapis`)
- dotenv
- cors

## Estructura del proyecto
```text
.
|-- app.js
|-- src/
|   |-- config/nodemailer.js
|   |-- controllers/mailsController.js
|   |-- routes/send.js
|   `-- utils/constants.js
|-- .env
`-- package.json
```

## Requisitos
- Node.js 18 o superior
- pnpm (recomendado) o npm
- Credenciales OAuth2 de Google para Gmail API

## Instalación
Con pnpm:
```bash
pnpm install
```

Con npm:
```bash
npm install
```

## Configuración
Crea o actualiza el archivo `.env` con estas variables:

```env
TO_WV=destinatario@dominio.com
# TO_MV=destinatario2@dominio.com   # Opcional (si usarás /sendMailMV)

NODEMAILER_USER=tu_correo@gmail.com
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_REFRESH_TOKEN=tu_refresh_token
GOOGLE_ACCESS_TOKEN=tu_access_token
```

Notas:
- `NODEMAILER_USER` debe coincidir con la cuenta autorizada en OAuth2.
- El proyecto actualmente usa `refreshToken` para enviar; `GOOGLE_ACCESS_TOKEN` está declarado pero no se utiliza en código.

## Ejecución
El proyecto no tiene script `start` definido en `package.json`, por lo que se ejecuta así:

```bash
node app.js
```

Servidor por defecto:
- `http://localhost:3000`

## Endpoints
Base: `/mail`

1. `GET /`  
   Health check simple. Responde `200`.

2. `GET /mail/`  
   Responde `Hello World!`.

3. `POST /mail/sendMailWV`  
   Envía correo al destinatario definido en `TO_WV`.

4. `POST /mail/sendMailMV`  
   Pensado para un segundo destinatario. Requiere ajustar configuración (ver sección "Observaciones").

### Body esperado (JSON)
```json
{
  "name": "Nombre Apellido",
  "email": "correo@dominio.com",
  "subject": "Asunto",
  "message": "Mensaje"
}
```

### Respuestas
Éxito:
```json
{
  "ok": true,
  "message": "Mensaje enviado correctamente"
}
```

Error:
```json
{
  "ok": false,
  "message": "Ocurrio un problema al enviar el mensaje, intentelo mas tarde"
}
```

## Seguridad
- No subas `.env` al repositorio.
- Si alguna credencial OAuth2 fue expuesta, revócala y genera nuevas credenciales inmediatamente.
- Restringe CORS en producción (evitar `origin: true` abierto).

## Mejoras recomendadas
- Agregar scripts en `package.json` (`start`, `dev`).
- Validar el body de entrada (campos requeridos y formato de email).
- Agregar rate limiting en rutas de envío.
- Implementar logging estructurado y pruebas básicas.

## Licencia
ISC
