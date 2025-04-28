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

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Erro ao cadastrar usuário')
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    throw error
  }
}
