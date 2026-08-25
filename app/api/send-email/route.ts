// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';

// ⚠️ Estas variables NO tienen NEXT_PUBLIC_
// Solo el servidor las ve, el cliente NO
const SERVICE_ID = process.env.EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, current_date } = await request.json();

    // Validar datos
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Verificar que las variables de entorno existen
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('❌ Faltan variables de entorno de EmailJS');
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    // Importar EmailJS dinámicamente (solo en servidor)
    const emailjs = await import('@emailjs/browser');

    // Enviar email usando EmailJS
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      current_date: current_date || new Date().toLocaleDateString('es-ES'),
    };

    const response = await emailjs.default.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    if (response.status === 200) {
      return NextResponse.json(
        { success: true, message: 'Email enviado correctamente' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error en API send-email:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
}
