import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    // Verifica se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já está em uso' },
        { status: 400 },
      )
    }

    // Cria hash da senha
    const hashedPassword = await bcrypt.hash(password, 12)

    // Cria novo usuário
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 },
    )
  }
}
