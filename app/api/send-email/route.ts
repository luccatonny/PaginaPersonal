// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('📧 API send-email called');
  
  try {
    // 1. Obtener variables de entorno
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    // ✅ CORRECTO: Usamos la Public Key (comienza con "s-gPoolXM20Fu4378")
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

    console.log('🔍 Variables de entorno:');
    console.log('SERVICE_ID:', SERVICE_ID ? `"${SERVICE_ID}"` : '❌ NO EXISTE');
    console.log('TEMPLATE_ID:', TEMPLATE_ID ? `"${TEMPLATE_ID}"` : '❌ NO EXISTE');
    console.log('PUBLIC_KEY:', PUBLIC_KEY ? `"${PUBLIC_KEY}"` : '❌ NO EXISTE');

    // 2. Validar variables de entorno
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('❌ Faltan variables de entorno de EmailJS');
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    // 3. Obtener datos del body
    const body = await request.json();
    console.log('📨 Datos recibidos:', body);

    const { name, email, message, current_date } = body;

    // 4. Validar datos
    if (!name || !email || !message) {
      console.error('❌ Datos incompletos');
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // 5. Preparar parámetros del template
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

    console.log('📤 Enviando a EmailJS via REST API');

    // 6. Enviar email usando fetch directo
    // ✅ La Public Key va en "user_id", NO la Private Key
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,  // ✅ ¡CORRECTO! Usamos la Public Key aquí
        template_params: templateParams,
      }),
    });

    const responseText = await response.text();
    console.log('✅ Respuesta de EmailJS:', response.status, responseText);

    // 7. Manejar respuesta
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
    
    let errorMessage = 'Error desconocido';
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Stack trace:', error.stack);
    }
    
    return NextResponse.json(
      { error: `Error al enviar el mensaje: ${errorMessage}` },
      { status: 500 }
    );
  }
}