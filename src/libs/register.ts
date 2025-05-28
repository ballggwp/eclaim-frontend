export default async function registerUser({
    name,
    email,
    password,
  }: {
    name: string
    email: string
    password: string
  }) {
    const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role: 'user', // Always force user role
        }),
      }
    )
  
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'Failed to register user.')
    }
  
    return await res.json()
  }
  