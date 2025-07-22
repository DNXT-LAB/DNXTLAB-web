import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, message } = await req.json()

    // Validación básica
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Configurar transporter de nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Configurar el email
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `Nuevo contacto desde DNXTLAB - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h1 style="color: #333; text-align: center; margin-bottom: 30px;">Nuevo Contacto desde DNXTLAB</h1>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #555; margin-bottom: 15px;">Información del Cliente:</h2>
            <p><strong>Nombre:</strong> ${firstName}</p>
            <p><strong>Apellido:</strong> ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff;">${email}</a></p>
          </div>
          
          <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; border-left: 4px solid #007bff;">
            <h3 style="color: #333; margin-bottom: 15px;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 15px; background-color: #f8f8f8; border-radius: 5px;">
            <p style="margin: 0; color: #888; font-size: 14px;">Este email fue enviado desde el formulario de contacto de DNXTLAB</p>
          </div>
        </div>
      `,
      text: `
        Nuevo Contacto desde DNXTLAB
        
        Información del Cliente:
        Nombre: ${firstName}
        Apellido: ${lastName}
        Email: ${email}
        
        Mensaje:
        ${message}
        
        ---
        Este email fue enviado desde el formulario de contacto de DNXTLAB
      `,
    }

    // Enviar el email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email enviado correctamente' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error enviando email:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor. Por favor, intenta de nuevo.' },
      { status: 500 }
    )
  }
} 