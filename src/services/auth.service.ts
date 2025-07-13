export async function createUser({
  email,
  password,
  name,
}: {
  email: string
  password: string
  name?: string
}) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })

    const responseBody = await response.json()

    if (!response.ok) {
      throw new Error(responseBody.error || 'Erro ao cadastrar usuário')
    }

    return responseBody
  } catch (error) {
    console.log('Erro no serviço createUser:', error)
    throw error
  }
}
