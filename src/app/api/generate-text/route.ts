import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Você é um especialista em marketing digital. Gere textos curtos para interfaces de usuário.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 30,
    })

    return NextResponse.json({
      text: response.choices[0]?.message?.content?.trim(),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao gerar texto' }, { status: 500 })
  }
}
