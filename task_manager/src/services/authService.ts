import { BASE_URL } from "../utils/constants"

export const registerUser = async ({ name, role, email, password }: {
  name: string
  role: string
  email: string
  password: string
}) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, role, email, password })
    })
    return response
  } catch (error) {
    console.error("error occurred to register user service", error);
    return error;
  }
}

export const loginUser = async ({ email, password }: {
  email: string
  password: string
}) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    return response
  } catch (error) {
    console.error("error occurred to login user service", error);
    return error;
  }
}