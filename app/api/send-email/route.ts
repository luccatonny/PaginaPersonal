// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('📧 API send-email called');

  try {
    // Variables de entorno
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

    console.log('🔍 Variables de entorno:');
    console.log('SERVICE_ID:', SERVICE_ID ? `"${SERVICE_ID}"` : '❌ NO EXISTE');
    console.log('TEMPLATE_ID:', TEMPLATE_ID ? `"${TEMPLATE_ID}"` : '❌ NO EXISTE');
    console.log('PUBLIC_KEY:', PUBLIC_KEY ? '✅ EXISTE' : '❌ NO EXISTE');
    console.log('PRIVATE_KEY:', PRIVATE_KEY ? '✅ EXISTE' : '❌ NO EXISTE');

    // Validar variables
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !PRIVATE_KEY) {
      console.error('❌ Faltan variables de entorno de EmailJS');
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    // Obtener datos
    const body = await request.json();
    console.log('📨 Datos recibidos:', body);

    const { name, email, message, current_date } = body;

    // Validar datos
    if (!name || !email || !message) {
      console.error('❌ Datos incompletos');
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Parámetros del template
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      current_date: current_date || new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    };

    console.log('📤 Enviando a EmailJS...');

    // ✅ Enviar a EmailJS con PUBLIC_KEY y PRIVATE_KEY
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,       // ← Public Key
        accessToken: PRIVATE_KEY,  // ← Private Key (¡NUEVO!)
        template_params: templateParams,
      }),
    });

    const responseText = await response.text();
    console.log('📥 Respuesta de EmailJS:', response.status, responseText);

    if (response.ok) {
      console.log('✅ Email enviado correctamente');
      return NextResponse.json(
        { success: true, message: 'Email enviado correctamente' },
        { status: 200 }
      );
    } else {
      console.error('❌ EmailJS respondió con error:', response.status, responseText);
      return NextResponse.json(
        { error: `Error al enviar el email: ${responseText}` },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('❌ Error en API send-email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { error: `Error al enviar el mensaje: ${errorMessage}` },
      { status: 500 }
    );
  }
}
