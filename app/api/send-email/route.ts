// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('📧 API send-email called');
  
  try {
    // ✅ Usar PRIVATE_KEY (porque está en modo estricto)
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY; // ← ¡Private Key!

    console.log('🔍 Variables de entorno:');
    console.log('SERVICE_ID:', SERVICE_ID ? `"${SERVICE_ID}"` : '❌ NO EXISTE');
    console.log('TEMPLATE_ID:', TEMPLATE_ID ? `"${TEMPLATE_ID}"` : '❌ NO EXISTE');
    console.log('PRIVATE_KEY:', PRIVATE_KEY ? `"${PRIVATE_KEY.substring(0, 10)}..."` : '❌ NO EXISTE');

    // Validar variables
    if (!SERVICE_ID || !TEMPLATE_ID || !PRIVATE_KEY) {
      console.error('❌ Faltan variables de entorno de EmailJS');
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    // Obtener datos del body
    const body = await request.json();
    const { name, email, message, current_date } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

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

    console.log('📤 Enviando a EmailJS via REST API con Private Key');

    // ✅ Enviar con Private Key en "user_id"
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PRIVATE_KEY,  // ← ¡Private Key aquí!
        template_params: templateParams,
      }),
    });

    const responseText = await response.text();
    console.log('✅ Respuesta de EmailJS:', response.status, responseText);

    if (response.ok) {
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