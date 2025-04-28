import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateMarketingText(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'Você é um especialista em marketing digital. Gere textos curtos (máximo 10 palavras) para formulários de login/cadastro que sejam convidativos e profissionais.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 20,
    })

    return response.choices[0]?.message?.content?.trim() || ''
  } catch (error) {
    console.error('Erro ao gerar texto com IA:', error)
    return 'Junte-se à nossa comunidade'
  }
}
