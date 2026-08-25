// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('📧 API send-email called');
  
  try {
    // 1. Obtener variables de entorno DENTRO de la función
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

    // 2. Log para debuggear (se verá en los logs de Vercel)
    console.log('🔍 Variables de entorno:');
    console.log('SERVICE_ID:', SERVICE_ID ? '✅ Existe' : '❌ NO EXISTE');
    console.log('TEMPLATE_ID:', TEMPLATE_ID ? '✅ Existe' : '❌ NO EXISTE');
    console.log('PUBLIC_KEY:', PUBLIC_KEY ? '✅ Existe' : '❌ NO EXISTE');

    // 3. Validar variables de entorno
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('❌ Faltan variables de entorno de EmailJS');
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    // 4. Obtener datos del body
    const body = await request.json();
    console.log('📨 Datos recibidos:', body);

    const { name, email, message, current_date } = body;

    // 5. Validar datos
    if (!name || !email || !message) {
      console.error('❌ Datos incompletos');
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // 6. Importar EmailJS dinámicamente
    const emailjs = await import('@emailjs/browser');

    // 7. Preparar parámetros del template
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

    console.log('📤 Enviando a EmailJS con templateParams:', templateParams);

    // 8. Enviar email
    const response = await emailjs.default.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    console.log('✅ Respuesta de EmailJS:', {
      status: response.status,
      text: response.text,
    });

    // 9. Manejar respuesta
    if (response.status === 200) {
      return NextResponse.json(
        { success: true, message: 'Email enviado correctamente' },
        { status: 200 }
      );
    } else {
      console.error('❌ EmailJS respondió con error:', response);
      return NextResponse.json(
        { error: `Error al enviar el email: ${response.text || 'Error desconocido'}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ Error en API send-email:', error);
    
    // Mostrar más detalles del error
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Detalle del error:', errorMessage);
    
    return NextResponse.json(
      { error: `Error al enviar el mensaje: ${errorMessage}` },
      { status: 500 }
    );
  }
}
